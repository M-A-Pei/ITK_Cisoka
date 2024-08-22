const router = require("express").Router
const cekTahun = require("../middleware/cekTahun")
const db = require("../libs/db")
const BULAN = require("../static/BULAN")

const route = router()

route.get("/:date?", async(req, res)=>{
    await cekTahun()
    const {date} = req.params
    if(!date){
        const date = new Date()        
        const tahun = date.getFullYear()
        let bulan = (date.getMonth() + 1)
        console.log(date.getMonth())
        if(bulan < 10) bulan = "0" + bulan

        await loadPage(bulan, tahun, res)
    }else{
        const tahun = date.split("-")[0]
        let bulan = date.split("-")[1]
        await loadPage(bulan, tahun, res)
    }
})

async function loadPage(bulan, tahun, res){
    const tahunDanBulan = tahun + "-" + bulan
    console.log(tahunDanBulan)
    const y = await db.bulan.findFirst({
        where: {
            tahun: {
                tahun: String(tahun)
            }, bulan: BULAN[bulan - 1]
        },
        select: {
            total: true,
            id: true
        }
    })

    if(!y){
        return res.render("bulanan", {tahunDanBulan, tidakAda: true})
    }

    const bulanId = y.id
    

    const listBimbel = await db.pesertaBimbel.findMany({
        where: {
            bulanId,
            sudahBayar: true
        }
    })

    const listKomputer = await db.pesertaKomputer.findMany({
        where: {
            bulanId,
            sudahBayar: true
        }
    })

    const listInggris = await db.pesertaInggris.findMany({
        where: {
            bulanId,
            sudahBayar: true
        }
    })

    const total = y.total

    res.render("bulanan", {tahunDanBulan, total, listBimbel, listInggris, listKomputer})
}

module.exports = route