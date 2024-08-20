-- CreateTable
CREATE TABLE "tahun" (
    "id" SERIAL NOT NULL,
    "tahun" TEXT NOT NULL,

    CONSTRAINT "tahun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bulan" (
    "id" SERIAL NOT NULL,
    "bulan" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "tahunId" INTEGER NOT NULL,

    CONSTRAINT "bulan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesertaBimbel" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "sudahBayar" BOOLEAN NOT NULL,
    "bulanId" INTEGER NOT NULL,

    CONSTRAINT "pesertaBimbel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesertaInggris" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "sudahBayar" BOOLEAN NOT NULL,
    "bulanId" INTEGER NOT NULL,

    CONSTRAINT "pesertaInggris_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesertaKomputer" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "sudahBayar" BOOLEAN NOT NULL,
    "bulanId" INTEGER NOT NULL,

    CONSTRAINT "pesertaKomputer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bulan" ADD CONSTRAINT "bulan_tahunId_fkey" FOREIGN KEY ("tahunId") REFERENCES "tahun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesertaBimbel" ADD CONSTRAINT "pesertaBimbel_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "bulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesertaInggris" ADD CONSTRAINT "pesertaInggris_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "bulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesertaKomputer" ADD CONSTRAINT "pesertaKomputer_bulanId_fkey" FOREIGN KEY ("bulanId") REFERENCES "bulan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
