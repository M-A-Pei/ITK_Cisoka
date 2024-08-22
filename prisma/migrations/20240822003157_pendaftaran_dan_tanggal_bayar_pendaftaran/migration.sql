/*
  Warnings:

  - You are about to drop the column `bulanan` on the `pesertabimbel` table. All the data in the column will be lost.
  - Added the required column `tanggalBayarBulanan` to the `pesertaBimbel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBayarPendaftaran` to the `pesertaBimbel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBayarBulanan` to the `pesertaInggris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBayarPendaftaran` to the `pesertaInggris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBayarBulanan` to the `pesertaKomputer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBayarPendaftaran` to the `pesertaKomputer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pesertabimbel` DROP COLUMN `bulanan`,
    ADD COLUMN `pendaftaran` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tanggalBayarBulanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL,
    MODIFY `sudahBayar` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `pesertainggris` ADD COLUMN `pendaftaran` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tanggalBayarBulanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL,
    MODIFY `sudahBayar` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `pesertakomputer` ADD COLUMN `pendaftaran` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tanggalBayarBulanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalBayarPendaftaran` VARCHAR(191) NOT NULL,
    MODIFY `sudahBayar` BOOLEAN NOT NULL DEFAULT false;
