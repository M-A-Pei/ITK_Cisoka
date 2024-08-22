/*
  Warnings:

  - Added the required column `bulanan` to the `pesertaBimbel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pesertabimbel` ADD COLUMN `bulanan` BOOLEAN NOT NULL;
