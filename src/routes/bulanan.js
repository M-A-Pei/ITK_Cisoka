const router = require("express").Router
const cekTahun = require("../middleware/cekTahun")
const db = require("../libs/db")
const BULAN = require("../static/BULAN")
const {hargaBulanBimbel, hargaBulanKomputer, hargaBulanInggris} = require("../static/HARGA")

const route = router()

route.get("/:date?", async(req, res)=>{
    const isLogin = req.session.isLogin
    if(!isLogin){
        return res.redirect("/auth/login")
    }
    await cekTahun()
    const {date} = req.params
    if(!date){
        const date = new Date()        
        const tahun = date.getFullYear()
        let bulan = (date.getMonth() + 1)
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
    const response = await db.bulan.findFirst({
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

    if(!response){
        return res.render("bulanan", {tahunDanBulan, tidakAda: true})
    }

    const bulanId = response.id
    

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

    const total = response.total

    const x = (listInggris.length * hargaBulanInggris) + (listBimbel.length * hargaBulanBimbel) + (listKomputer.length * hargaBulanKomputer)
    const listPendaftaran = x == 0? total : (total - x) == total? 0 : (total - x) //hitung total pendaftaran bulan ini dengan cara mengurangi total yang sudah bayar bulanan dengan total bulanan 
    res.render("bulanan", {tahunDanBulan, total, listBimbel, listInggris, listKomputer, hargaBulanBimbel, hargaBulanInggris, hargaBulanKomputer, listPendaftaran})
}

module.exports = route