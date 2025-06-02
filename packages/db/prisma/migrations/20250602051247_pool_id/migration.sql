/*
  Warnings:

  - Added the required column `poolId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "poolId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pool" (
    "domain" TEXT NOT NULL,
    "poolId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_domain_key" ON "Pool"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Pool_poolId_key" ON "Pool"("poolId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("poolId") ON DELETE RESTRICT ON UPDATE CASCADE;
