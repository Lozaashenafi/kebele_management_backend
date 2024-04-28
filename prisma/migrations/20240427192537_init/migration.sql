-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(191) NOT NULL,
    `zone` VARCHAR(191) NOT NULL,
    `wereda` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kebeles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KebeleMenders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kebeleId` INTEGER NOT NULL,
    `menderName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'MANAGER', 'SECRATERY') NOT NULL DEFAULT 'USER',
    `activeStatus` ENUM('BLOCKED', 'ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `addressId` INTEGER NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IdRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menderId` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `fatherName` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `birthDate` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `houseNumber` VARCHAR(191) NOT NULL,
    `workStatus` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `houseLive` VARCHAR(191) NOT NULL,
    `requestStatus` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `IdRequests_email_key`(`email`),
    UNIQUE INDEX `IdRequests_phone_key`(`phone`),
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
    `idStatusId` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idnumber` INTEGER NOT NULL,

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
ALTER TABLE `Kebeles` ADD CONSTRAINT `Kebeles_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KebeleMenders` ADD CONSTRAINT `KebeleMenders_kebeleId_fkey` FOREIGN KEY (`kebeleId`) REFERENCES `Kebeles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IdRequests` ADD CONSTRAINT `IdRequests_menderId_fkey` FOREIGN KEY (`menderId`) REFERENCES `KebeleMenders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IdStatuss` ADD CONSTRAINT `IdStatuss_idRequestId_fkey` FOREIGN KEY (`idRequestId`) REFERENCES `IdRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BirthRequests` ADD CONSTRAINT `BirthRequests_idStatusId_fkey` FOREIGN KEY (`idStatusId`) REFERENCES `IdStatuss`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeathRequests` ADD CONSTRAINT `DeathRequests_birthRequestId_fkey` FOREIGN KEY (`birthRequestId`) REFERENCES `BirthRequests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
