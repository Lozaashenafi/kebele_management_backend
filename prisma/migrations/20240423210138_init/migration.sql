/*
  Warnings:

  - You are about to drop the column `kebeleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `kebeleMenderId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Users_kebeleId_fkey` ON `users`;

-- DropIndex
DROP INDEX `Users_kebeleMenderId_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `kebeleId`,
    DROP COLUMN `kebeleMenderId`;
