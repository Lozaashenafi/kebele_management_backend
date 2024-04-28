-- AlterTable
ALTER TABLE `birthrequests` ADD COLUMN `approved` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `idrequests` ADD COLUMN `approved` BOOLEAN NULL DEFAULT false;
