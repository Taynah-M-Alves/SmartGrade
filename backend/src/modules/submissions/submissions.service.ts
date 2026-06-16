import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

import { PDFParse } from 'pdf-parse';

const submissionInclude = {
  task: {
    include: {
      criteria: true,
    },
  },

  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },

  criteriaFeedback: {
    include: {
      criterion: true,
    },
  },
};

@Injectable()
export class SubmissionsService {
  private readonly supabase: SupabaseClient;
  private readonly bucketName = 'submissions';

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
  ) {
    const rawUrl = this.configService.get<string>('SUPABASE_URL') ?? '';
    const supabaseUrl = rawUrl.replace('/rest/v1/', '').replace(/\/$/, '');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY') ?? '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  private async uploadToStorage(
    buffer: Buffer,
    originalName: string,
  ): Promise<string> {
    const safeName = originalName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    const filename = `${Date.now()}-${safeName}`;

    const { error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(filename, buffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException(
        `Erro ao enviar arquivo: ${error.message}`,
      );
    }

    const { data } = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filename);

    return data.publicUrl;
  }

  private async parsePdfBuffer(buffer: Buffer): Promise<string> {
    try {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      return result.text ?? '';
    } catch (error: any) {
      console.error('Erro ao parsear PDF:', error?.message);
      return '';
    }
  }

  async create(
    fileBuffer: Buffer,
    originalName: string,
    taskId: number,
    userId: number,
    createdById: number,
  ) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { criteria: true },
    });

    if (!task) {
      throw new NotFoundException('Atividade não encontrada');
    }

    // Parsear PDF do buffer antes do upload — sem depender de download externo
    const pdfText = await this.parsePdfBuffer(fileBuffer);

    // Upload para Supabase Storage
    const fileUrl = await this.uploadToStorage(fileBuffer, originalName);

    // Salvar submission no banco
    const submission = await this.prisma.taskSubmission.create({
      data: { fileUrl, taskId, userId, createdById },
    });

    // Avaliar com o texto já extraído
    return await this.evaluateWithText(submission.id, pdfText, task.criteria);
  }

  private async evaluateWithText(
    submissionId: number,
    pdfText: string,
    criteria: any[],
  ) {
    const aiResponse = await this.aiService.evaluateSubmission(pdfText, criteria);

    await this.prisma.$transaction(async (tx) => {
      await tx.taskSubmission.update({
        where: { id: submissionId },
        data: {
          aiFeedback: aiResponse.consideracoes,
          aiGrade: aiResponse.notaFinal,
          status: 'FINALIZADO',
        },
      });

      await tx.submissionCriterionFeedback.deleteMany({
        where: { submissionId },
      });

      for (const item of aiResponse.criterios) {
        const criterion = criteria.find((c) => c.title === item.criterio);
        if (!criterion) continue;

        await tx.submissionCriterionFeedback.create({
          data: {
            submissionId,
            criterionId: criterion.id,
            score: item.nota,
            comment: item.observacao,
          },
        });
      }
    });

    return await this.findOne(submissionId);
  }

  async extractText(submissionId: number) {
    const submission = await this.prisma.taskSubmission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      throw new NotFoundException('Submissão não encontrada');
    }

    // Baixar do Supabase usando a service key (autenticado)
    const urlPath = submission.fileUrl.split('/object/public/submissions/')[1];
    if (!urlPath) {
      throw new InternalServerErrorException('URL do arquivo inválida');
    }

    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .download(urlPath);

    if (error || !data) {
      throw new InternalServerErrorException(
        `Erro ao baixar arquivo: ${error?.message}`,
      );
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await this.parsePdfBuffer(buffer);

    return { text };
  }

  async findAll() {
    return await this.prisma.taskSubmission.findMany({
      include: submissionInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTask(taskId: number) {
    return await this.prisma.taskSubmission.findMany({
      where: { taskId },
      include: submissionInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMine(userId: number) {
    return await this.prisma.taskSubmission.findMany({
      where: { userId },
      include: submissionInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(submissionId: number) {
    const submission = await this.prisma.taskSubmission.findUnique({
      where: { id: submissionId },
      include: submissionInclude,
    });

    if (!submission) {
      throw new NotFoundException('Submissão não encontrada');
    }

    return submission;
  }

  async updateGrade(
    submissionId: number,
    grade: number,
    feedback?: string,
  ) {
    await this.findOne(submissionId);

    return await this.prisma.taskSubmission.update({
      where: { id: submissionId },
      data: {
        professorGrade: grade,
        ...(feedback !== undefined && { professorFeedback: feedback }),
        status: 'FINALIZADO',
      },
      include: submissionInclude,
    });
  }

  async evaluateSubmission(
    submissionId: number,
    preloadedTask?: { criteria: any[] },
  ) {
    const submission = await this.prisma.taskSubmission.findUnique({
      where: { id: submissionId },
      include: { task: { include: { criteria: true } } },
    });

    if (!submission) {
      throw new NotFoundException('Submissão não encontrada');
    }

    const criteria = preloadedTask?.criteria ?? submission.task.criteria;

    // Baixar via SDK do Supabase (autenticado, sem depender de URL pública)
    const urlPath = submission.fileUrl.split('/object/public/submissions/')[1];
    let pdfText = '';

    if (urlPath) {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(urlPath);

      if (!error && data) {
        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        pdfText = await this.parsePdfBuffer(buffer);
      }
    }

    return await this.evaluateWithText(submissionId, pdfText, criteria);
  }
}
