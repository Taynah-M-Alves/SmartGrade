// import {
//   Body,
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
//   Get,
// } from '@nestjs/common';

// import { FileInterceptor } from '@nestjs/platform-express';

// import { diskStorage } from 'multer';

// import { extname } from 'path';

// import { TaskSubmissionService } from './task-submission.service';

// import { CreateTaskSubmissionDto } from './dtos/task-submission.dto';

// @Controller('task-submission')
// export class TaskSubmissionController {
//   constructor(
//     private readonly taskSubmissionService: TaskSubmissionService,
//   ) {}

//   @Post('sendFile')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads',

//         filename: (req, file, callback) => {
//           const uniqueName =
//             Date.now() + extname(file.originalname);

//           callback(null, uniqueName);
//         },
//       }),
//     }),
//   )
//   async create(
//     @UploadedFile() file: Express.Multer.File,

//     @Body() dto: CreateTaskSubmissionDto,
//   ) {
//     return this.taskSubmissionService.create(dto, file);
//   }

//   @Get('c')
//     async getTaskSubmissionText() {
//         return {
//         message: 'rota funcionando',
//         };
//     }
    
  
// }