-- AlterTable
ALTER TABLE `pesertabimbel` MODIFY `tanggalBayarBulanan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `pesertainggris` MODIFY `tanggalBayarBulanan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `pesertakomputer` MODIFY `tanggalBayarBulanan` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL DEFAULT '';
