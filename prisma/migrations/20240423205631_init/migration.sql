/*
  Warnings:

  - You are about to drop the column `adressId` on the `users` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_adressId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `adressId`,
    ADD COLUMN `addressId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
