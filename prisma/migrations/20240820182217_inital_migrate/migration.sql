-- CreateTable
CREATE TABLE `tahun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tahun` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bulan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bulan` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `tahunId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesertaBimbel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `sudahBayar` BOOLEAN NOT NULL,
    `bulanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesertaInggris` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `sudahBayar` BOOLEAN NOT NULL,
    `bulanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesertaKomputer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `sudahBayar` BOOLEAN NOT NULL,
    `bulanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bulan` ADD CONSTRAINT `bulan_tahunId_fkey` FOREIGN KEY (`tahunId`) REFERENCES `tahun`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesertaBimbel` ADD CONSTRAINT `pesertaBimbel_bulanId_fkey` FOREIGN KEY (`bulanId`) REFERENCES `bulan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesertaInggris` ADD CONSTRAINT `pesertaInggris_bulanId_fkey` FOREIGN KEY (`bulanId`) REFERENCES `bulan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesertaKomputer` ADD CONSTRAINT `pesertaKomputer_bulanId_fkey` FOREIGN KEY (`bulanId`) REFERENCES `bulan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
