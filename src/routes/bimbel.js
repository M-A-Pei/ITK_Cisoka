const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")
const BULAN = require("../static/BULAN")

const route = router()

route.get("/:date?", async(req, res)=>{
    const tanggal = req.params.date
    if(!tanggal){
        cekTahun().then(async(value)=>{
            const data = await db.pesertaBimbel.findMany({
                where: {
                    bulanId: value.bulan.id,
                }
            })
    
            const date = new Date()
            const tahun = date.getFullYear()
            const bulan = "0" + (date.getMonth() + 1)
            const tahunDanBulan = tahun + "-" + bulan
    
            res.render("bimbel", {data, tahunDanBulan})
        })
    }else{
        const tahun = tanggal.split("-")[0]
        const bulan = BULAN[tanggal.split("-")[1]-1]


        console.log(tahun, bulan)
        const data = await db.pesertaBimbel.findMany({
            where: {
                bulan: {
                    bulan: bulan,
                    tahun: {
                        tahun: tahun
                    }
                }
            }
        })

        const tahunDanBulan = tanggal

        res.render("bimbel", {data, tahunDanBulan})
    }
    
})

route.post("/", async (req, res)=>{
    const {nama} = req.body
    cekTahun().then(async(value)=>{
        await db.pesertaBimbel.create({
            data: {
                nama,
                sudahBayar: false,
                bulanId: value.bulan.id
            }
        })
        res.redirect("/bimbel")
    })
})

route.get("/bayar/:bimbelId", async (req, res)=>{
    const {bimbelId} = req.params
    await db.pesertaBimbel.update({
        where: {
            id: Number(bimbelId)
        },
        data: {
            sudahBayar: true
        }
    })
    res.redirect("/bimbel")
})

module.exports = route