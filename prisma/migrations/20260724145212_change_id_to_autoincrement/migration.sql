-- Drop existing data to allow type conversion
DELETE FROM "Project";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" TYPE INTEGER USING ("id"::integer);

-- AlterTable
ALTER TABLE "Project" ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1);
