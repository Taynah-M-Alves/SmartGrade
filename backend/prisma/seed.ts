// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {

//   // USERS
//   const user1 = await prisma.user.create({
//     data: {
//       name: 'Taynah Alves',
//       email: 'taynah@gmail.com',
//       password: '123456',
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       name: 'João Silva',
//       email: 'joao@gmail.com',
//       password: '123456',
//     },
//   });

//   const user3 = await prisma.user.create({
//     data: {
//       name: 'Maria Souza',
//       email: 'maria@gmail.com',
//       password: '123456',
//     },
//   });

//   // TASKS
//   const task1 = await prisma.task.create({
//     data: {
//       title: 'Projeto NestJS',
//       description: 'Criar uma API utilizando NestJS',
//       deadline: new Date('2026-09-01'),

//       createdById: user1.id,
//     },
//   });

//   const task2 = await prisma.task.create({
//     data: {
//       title: 'Projeto React Native',
//       description: 'Desenvolver aplicativo mobile',
//       deadline: new Date('2026-10-01'),

//       createdById: user2.id,
//     },
//   });

//   // PARAMETER SUBMISSIONS
//   await prisma.parameterSubmission.createMany({
//     data: [
//       {
//         title: 'Organização do código',
//         weight: 2.5,
//         description: 'Avaliar estrutura e organização do projeto',
//         taskId: task1.id,
//       },
//       {
//         title: 'Uso do Prisma',
//         weight: 3.0,
//         description: 'Avaliar implementação do Prisma ORM',
//         taskId: task1.id,
//       },
//       {
//         title: 'Interface do usuário',
//         weight: 2.0,
//         description: 'Avaliar design e usabilidade',
//         taskId: task2.id,
//       },
//       {
//         title: 'Responsividade',
//         weight: 2.5,
//         description: 'Avaliar adaptação para diferentes telas',
//         taskId: task2.id,
//       },
//     ],
//   });

//   console.log('Seed executada com sucesso!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });