-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParameterSubmission" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "ParameterSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskSubmission" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TaskSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterSubmission" ADD CONSTRAINT "ParameterSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
