/*
  Warnings:

  - You are about to drop the `manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `manager` DROP FOREIGN KEY `Manager_kebeleId_fkey`;

-- DropTable
DROP TABLE `manager`;
