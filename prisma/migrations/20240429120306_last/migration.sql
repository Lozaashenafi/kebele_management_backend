-- AlterTable
ALTER TABLE `birthrequests` ADD COLUMN `given` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `idrequests` ADD COLUMN `given` BOOLEAN NULL DEFAULT false;
