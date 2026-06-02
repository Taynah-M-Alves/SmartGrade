/*
  Warnings:

  - You are about to drop the `ParameterSubmission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PROFESSOR', 'ALUNO');

-- DropForeignKey
ALTER TABLE "ParameterSubmission" DROP CONSTRAINT "ParameterSubmission_taskId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "ParameterSubmission";

-- CreateTable
CREATE TABLE "TaskCriteria" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskCriteria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskCriteria" ADD CONSTRAINT "TaskCriteria_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
