import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { AiService } from '../ai/ai.service';

import * as fs from 'fs';

import { PDFParse } from 'pdf-parse';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) { }

  async create(
    fileUrl: string,
    taskId: number,
    userId: number,
    createdById: number,
  ) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException(
        'Atividade não encontrada',
      );
    }

    return await this.prisma.taskSubmission.create({
      data: {
        fileUrl,
        taskId,
        userId,
        createdById,
      },
    });
  }

  async extractText(submissionId: number) {
    const submission =
      await this.prisma.taskSubmission.findUnique({
        where: {
          id: submissionId,
        },
      });

    if (!submission) {
      throw new NotFoundException(
        'Submissão não encontrada',
      );
    }

    const pdfBuffer = fs.readFileSync(
      submission.fileUrl,
    );

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    return {
      text: result.text,
    };
  }

  async findAll() {
    return await this.prisma.taskSubmission.findMany({
      include: {
        task: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByTask(taskId: number) {
    return await this.prisma.taskSubmission.findMany({
      where: {
        taskId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async evaluateSubmission(
    submissionId: number,
  ) {
    const submission =
      await this.prisma.taskSubmission.findUnique({
        where: {
          id: submissionId,
        },

        include: {
          task: {
            include: {
              criteria: true,
            },
          },
        },
      });

    if (!submission) {
      throw new NotFoundException(
        'Submissão não encontrada',
      );
    }

    const pdfBuffer = fs.readFileSync(
      submission.fileUrl,
    );

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    const aiResponse =
      await this.aiService.evaluateSubmission(
        result.text,
        submission.task.criteria,
      );

    await this.prisma.taskSubmission.update({
      where: {
        id: submissionId,
      },

      data: {
        aiFeedback:
          aiResponse.consideracoes,

        aiGrade:
          aiResponse.notaFinal,
      },
    });

    return aiResponse;
  }
}