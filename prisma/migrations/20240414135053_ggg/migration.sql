-- CreateTable
CREATE TABLE `IdRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `menderId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `matherName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gender` VARCHAR(191) NOT NULL,
    `houseNumber` VARCHAR(191) NOT NULL,
    `workStatus` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `houseLive` VARCHAR(191) NOT NULL,
    `requestStatus` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `IdRequests_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IdStatuss` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRequestId` INTEGER NOT NULL,
    `paymentState` VARCHAR(191) NOT NULL,
    `menderStatus` VARCHAR(191) NOT NULL,
    `receptionStatus` VARCHAR(191) NOT NULL,
    `managerStatus` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,
    `isGiven` BOOLEAN NOT NULL,
    `givenDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expireDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `IdStatuss_idRequestId_key`(`idRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BirthRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idStatusId` INTEGER NOT NULL,
    `requestStatus` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeathRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `birthRequestId` INTEGER NOT NULL,
    `receptionStatus` VARCHAR(191) NOT NULL,
    `managerStatus` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,
    `isGiven` BOOLEAN NOT NULL,
    `givenDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IdStatuss` ADD CONSTRAINT `IdStatuss_idRequestId_fkey` FOREIGN KEY (`idRequestId`) REFERENCES `IdRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BirthRequests` ADD CONSTRAINT `BirthRequests_idStatusId_fkey` FOREIGN KEY (`idStatusId`) REFERENCES `IdStatuss`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeathRequests` ADD CONSTRAINT `DeathRequests_birthRequestId_fkey` FOREIGN KEY (`birthRequestId`) REFERENCES `BirthRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
