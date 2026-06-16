import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { memoryStorage } from 'multer';

import { SubmissionsService } from './submissions.service';

import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
  ) { }


  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),

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
      file.buffer,
      file.originalname,

      Number(createSubmissionDto.taskId),

      Number(createSubmissionDto.userId),

      req.user.id
    );
  }

  @Get()
  async findAll() {
    return await this.submissionsService.findAll();
  }

  @Get('/my')
  async findMine(@Req() req) {
    return await this.submissionsService.findMine(req.user.id);
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

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.submissionsService.findOne(id);
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

  @UseGuards(RolesGuard)
  @Roles(Role.PROFESSOR)
  @Patch('/:id/grade')
  async updateGrade(
    @Param('id', ParseIntPipe)
    id: number,

    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return await this.submissionsService.updateGrade(
      id,
      updateGradeDto.grade,
      updateGradeDto.feedback,
    );
  }
}
