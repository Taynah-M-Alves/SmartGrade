import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskSubmissionDto } from './dtos/task-submission.dto';

import * as fs from 'fs';

const { PDFParse } = require('pdf-parse');

@Injectable()
export class TaskSubmissionService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    dto: CreateTaskSubmissionDto,
    file: Express.Multer.File,
  ) {
    // Verifica tarefa
    const task = await this.prismaService.task.findUnique({
      where: {
        id: Number(dto.taskId),
      },

      include: {
        parameters: true,
      },
    });

    if (!task) {
      throw new NotFoundException(
        'Tarefa não encontrada',
      );
    }

    // Verifica usuário
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(dto.userId),
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado',
      );
    }

    // URL do arquivo
    const fileUrl = `/uploads/${file.filename}`;

    // Extrai texto do PDF
    const pdfText = await this.extractPdfText(file);

    console.log(pdfText);

    // Exemplo fake IA
    const aiResponse = {
      grade: 8.5,
      feedback:
        'A atividade está bem estruturada.',
    };

    // Salva submissão
    const submission =
      await this.prismaService.taskSubmission.create({
        data: {
          fileUrl,

          aiFeedback: aiResponse.feedback,
          aiGrade: aiResponse.grade,

          taskId: Number(dto.taskId),
          userId: Number(dto.userId),

          createdById: Number(dto.userId)
        },
      });

    return {
      submission,
      pdfText,
    };
  }

 private async extractPdfText(
  file: Express.Multer.File,
) {

  const dataBuffer = fs.readFileSync(file.path);

  const parser = new PDFParse({data: dataBuffer});

  const result = await parser.getText();
	console.log(result.text);

  return result.text

  // const pdfData = await pdfParse(dataBuffer);

  // return pdfData.text;
}
    
}