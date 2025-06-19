/*
  Warnings:

  - The primary key for the `Firm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Firm` table. All the data in the column will be lost.
  - The primary key for the `Hirer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `Hirer` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Hirer` table. All the data in the column will be lost.
  - The primary key for the `Worker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Firm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Hirer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Hirer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Firm" DROP CONSTRAINT "Firm_id_fkey";

-- DropForeignKey
ALTER TABLE "Hirer" DROP CONSTRAINT "Hirer_id_fkey";

-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_workerId_fkey";

-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_id_fkey";

-- AlterTable
ALTER TABLE "Firm" DROP CONSTRAINT "Firm_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Firm_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Hirer" DROP CONSTRAINT "Hirer_pkey",
DROP COLUMN "Address",
DROP COLUMN "id",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Hirer_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Worker_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hirer" ADD CONSTRAINT "Hirer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Firm" ADD CONSTRAINT "Firm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
