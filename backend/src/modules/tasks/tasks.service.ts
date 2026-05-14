import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParameterSubmissionDTO, CreateTaskDTO } from './dtos/task';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService){}

        async createTask(data: CreateTaskDTO){

            const user = await this.prismaService.user.findUnique({
                where: {
                    id: data.createdById,  
                }
            });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }

            const task = await this.prismaService.task.create({
                data: {
                    ...data,
                    deadline: new Date(data.deadline),
                    createdById: data.createdById,
                },
            });

            return task;
        }

        async createParameter(data: CreateParameterSubmissionDTO){
            const task = await this.prismaService.task.findUnique({
                where:
                {id: data.taskId,}
            })

            if (!task) {
                throw new NotFoundException('Tarefa não encontrada');
            }

            const parameter = await this.prismaService.parameterSubmission.create({
                data:{
                    ...data,
                    taskId: data.taskId,
                }
            })
            return parameter;
        }
    }

