const db = require("../libs/db")
const bulan = require("../static/BULAN")

module.exports = async function cekTahun(){

    const date = new Date()
    const cekTahun = await db.tahun.findFirst({ //bagian ini dan kebawahnya buat ngecek klo tahun dan bulan ini udh ada di database atau blm, kalau blm buat :D
        where: {
            tahun: String(date.getFullYear())
        }
    })
    
    if(!cekTahun){
        await db.tahun.create({
            data: {
                tahun: String(date.getFullYear())
            }
        })
    }

    const cekBulan = await db.bulan.findFirst({
        where: {
            bulan: bulan[date.getMonth()],
            tahunId: cekTahun.id
        }
    })

    if(!cekBulan){
        await db.bulan.create({
            data: {
                bulan: bulan[date.getMonth()],
                tahunId: cekTahun.id,
                total: 0
            }
        })
    }     

    return {tahun: cekTahun, bulan: cekBulan}
}