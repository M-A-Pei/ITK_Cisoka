const router = require("express").Router
const cekTahun = require("../middleware/cekTahun")
const db = require("../libs/db")
const BULAN = require("../static/BULAN")

const route = router()

route.get("/:date?", async(req, res)=>{
    cekTahun().then(()=>loadBulanan(req, res))
})

async function loadBulanan(req, res){
    const {date} = req.params
    if(!date){
        const date = new Date()        
        const tahun = date.getFullYear()
        let bulan = (date.getMonth() + 1)
        if(bulan < 10) bulan = "0" + bulan
        const tahunDanBulan = tahun + "-" + bulan

        const x = await db.tahun.findFirst({
            where: {
                tahun: String(tahun)
            },
            select: {id: true}
        })

        const tahunId = x.id

        const y = await db.bulan.findFirst({
            where: {
                tahunId, bulan: BULAN[date.getMonth()]
            },
            select: {
                total: true,
                id: true
            }
        })

        const total = y.total
        const bulanId = y.bulanId

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

        

        res.render("bulanan", {tahunDanBulan, total, listBimbel, listInggris, listKomputer})
    }else{
        const tahun = date.split("-")[0]
        const bulan = date.split("-")[1]-1
        const x = await db.tahun.findFirst({
            where: {
                tahun: String(tahun)
            },
            select: {id: true}
        })

        const tahunId = x.id

        const y = await db.bulan.findFirst({
            where: {
                tahunId, bulan: BULAN[bulan]
            },
            select: {
                total: true
            }
        })

        if(!y){
            return res.render("bulanan", {tahunDanBulan: date, tidakAda: true})
        }

        const total = y.total

        res.render("bulanan", {tahunDanBulan: date, total})
    }
}

module.exports = route