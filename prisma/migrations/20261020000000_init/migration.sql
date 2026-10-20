-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "budget" DOUBLE PRECISION NOT NULL,
    "actualCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "projectId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "monthNumber" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "projected" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "totalProjects" INTEGER NOT NULL DEFAULT 0,
    "totalSpent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastContact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_year_monthNumber_key" ON "Revenue"("year", "monthNumber");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

