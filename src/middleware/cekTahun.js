const db = require("../libs/db")
const bulan = require("../static/BULAN")

module.exports = async function cekTahun(){

    const date = new Date()
    const cekTahun = await db.tahun.findFirst({ //bagian ini dan kebawahnya buat ngecek klo tahun dan bulan ini udh ada di database atau blm, kalau blm buat :D
        where: {
            tahun: String(date.getFullYear())
        }
    })
    
    let tahunBaru
    if(!cekTahun){
        tahunBaru = await db.tahun.create({
            data: {
                tahun: String(date.getFullYear())
            }
        })
    }

    const cekBulan = await db.bulan.findFirst({
        where: {
            bulan: bulan[date.getMonth()],
            tahunId: cekTahun?.id || tahunBaru.id
        }
    })

    let bulanSekarang
    if(!cekBulan){
        bulanSekarang = await db.bulan.create({
            data: {
                bulan: bulan[date.getMonth()],
                tahunId: cekTahun?.id || tahunBaru.id,
                total: 0,
            }
        })

        const pesertaBimbelDulu = await db.pesertaBimbel.findMany({
            where: {
                bulanId : bulanSekarang.id - 1
            }
        })

        if(pesertaBimbelDulu.length != 0){
            pesertaBimbelDulu.forEach((e, i)=>{
                pesertaBimbelDulu[i].sudahBayar = false
                pesertaBimbelDulu[i].bulanId = bulanSekarang.id
                delete pesertaBimbelDulu[i].id
            })

            await db.pesertaBimbel.createMany({
                data: pesertaBimbelDulu
            })
            
        }

        const pesertaKomputerDulu = await db.pesertaKomputer.findMany({
            where: {
                bulanId : bulanSekarang.id - 1
            }
        })

        if(pesertaKomputerDulu.length != 0){
            pesertaKomputerDulu.forEach((e, i)=>{
                pesertaKomputerDulu[i].sudahBayar = false
                pesertaKomputerDulu[i].bulanId = bulanSekarang.id
                delete pesertaKomputerDulu[i].id
            })

            await db.pesertaKomputer.createMany({
                data: pesertaKomputerDulu
            })
            
        }

        const pesertaInggrisDulu = await db.pesertaInggris.findMany({
            where: {
                bulanId : bulanSekarang.id - 1
            }
        })

        if(pesertaInggrisDulu.length != 0){
            pesertaInggrisDulu.forEach((e, i)=>{
                pesertaInggrisDulu[i].sudahBayar = false
                pesertaInggrisDulu[i].bulanId = bulanSekarang.id
                delete pesertaInggrisDulu[i].id
            })

            await db.pesertaInggris.createMany({
                data: pesertaInggrisDulu
            })
            
        }
    }

    

    return {tahun: cekTahun, bulan: cekBulan || bulanSekarang}
}