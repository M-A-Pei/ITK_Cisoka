const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")
const BULAN = require("../static/BULAN")

const route = router()

route.get("/:date?", async(req, res)=>{
    const tanggal = req.params.date
    if(!tanggal){
        cekTahun().then(async(value)=>{
            const data = await db.pesertaKomputer.findMany({
                where: {
                    bulanId: value.bulan.id,
                }
            })
    
            const date = new Date()
            const tahun = date.getFullYear()
            let bulan = (date.getMonth() + 1)
            if(bulan < 10) bulan = "0" + bulan
            const tahunDanBulan = tahun + "-" + bulan
    
            res.render("komputer", {data, tahunDanBulan, currentDate: true})
        })
    }else{
        const tahun = tanggal.split("-")[0]
        const bulan = BULAN[tanggal.split("-")[1]-1]


        console.log(tahun, bulan)
        const data = await db.pesertaKomputer.findMany({
            where: {
                bulan: {
                    bulan: bulan,
                    tahun: {
                        tahun: tahun
                    }
                }
            }
        })
        const date = new Date()
        const tahunSekarang = date.getFullYear()
        let bulanSekarang = (date.getMonth() + 1)
        if(bulanSekarang < 10) bulanSekarang = "0" + bulanSekarang
        const tahunDanBulanSekarang = tahunSekarang + "-" + bulanSekarang

        const tahunDanBulan = tanggal
        let currentDate
        if(tahunDanBulan == tahunDanBulanSekarang) currentDate = true

        res.render("komputer", {data, tahunDanBulan, currentDate})
    }
    
})

route.post("/", async (req, res)=>{
    const {nama} = req.body
    cekTahun().then(async(value)=>{
        await db.pesertaKomputer.create({
            data: {
                nama,
                sudahBayar: false,
                bulanId: value.bulan.id
            }
        })
        res.redirect("/komputer")
    })
})

route.get("/bayar/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    await db.pesertaKomputer.update({
        where: {
            id: Number(komputerId)
        },
        data: {
            sudahBayar: true
        }
    })
    res.redirect("/komputer")
})

route.get("/cancel/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    await db.pesertaKomputer.update({
        where: {
            id: Number(komputerId)
        },
        data: {
            sudahBayar: false
        }
    })
    res.redirect("/komputer")
})

module.exports = route