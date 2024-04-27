-- CreateTable
CREATE TABLE `Manager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `kebeleId` INTEGER NOT NULL,
    `kebeleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_kebeleId_fkey` FOREIGN KEY (`kebeleId`) REFERENCES `Kebeles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
