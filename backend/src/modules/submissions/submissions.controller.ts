import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { SubmissionsService } from './submissions.service';

import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
  ) { }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(
            file.originalname,
          )}`;

          callback(null, uniqueName);
        },
      }),

      fileFilter: (req, file, callback) => {
        if (
          file.mimetype !== 'application/pdf'
        ) {
          return callback(
            new BadRequestException(
              'Apenas arquivos PDF são permitidos',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,

    @Body()
    createSubmissionDto: CreateSubmissionDto,

    @Req() req,
   ) {
    if (!file) {
      throw new BadRequestException(
        'Arquivo PDF obrigatório',
      );
    }

    return await this.submissionsService.create(
      file.path,

      Number(createSubmissionDto.taskId),

      Number(createSubmissionDto.userId),

      req.user.id,
    );
  }

  @Get()
  async findAll() {
    return await this.submissionsService.findAll();
  }

  @Get('/task/:taskId')
  async findByTask(
    @Param('taskId', ParseIntPipe)
    taskId: number,
  ) {
    return await this.submissionsService.findByTask(
      taskId,
    );
  }

  @Get('/extract-text/:id')
  async extractText(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.submissionsService.extractText(
      id,
    );
  }

  @Post('/evaluate/:id')
  async evaluateSubmission(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.submissionsService.evaluateSubmission(
      id,
    );
  }
}