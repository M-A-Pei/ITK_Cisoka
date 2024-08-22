const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")
const BULAN = require("../static/BULAN")
const {hargaBulanBimbel, hargaDaftarBimbel} = require("../static/HARGA")

const route = router()

route.get("/:date?", async(req, res)=>{
    const tanggal = req.params.date
    if(!tanggal){                               //kalo gaada param tanggal artinya lakuin cektahun buat ngedapetin bulan dan tahun sekarang, juga klo gaada dibuatin
        cekTahun().then(async(value)=>{
            const data = await db.pesertaBimbel.findMany({
                where: {
                    bulanId: value.bulan.id,
                }
            })
    
            const date = new Date()             //ambil bulan dan tahun buat inputan tanggal
            const tahun = date.getFullYear()
            let bulan = (date.getMonth() + 1)
            if(bulan < 10) bulan = "0" + bulan
            const tahunDanBulan = tahun + "-" + bulan
    

            res.render("bimbel", {data, tahunDanBulan, currentDate: true})
        })
    }else{
        const tahun = tanggal.split("-")[0]               //klo param tanggal ada kita render catetan sesuai dengan bulan dan tahun yang dipilih
        const bulan = BULAN[tanggal.split("-")[1]-1]

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
        const date = new Date()                                     //ambil bulan dan tahun buat inputan tanggal
        const tahunSekarang = date.getFullYear()
        let bulanSekarang = (date.getMonth() + 1)
        if(bulanSekarang < 10) bulanSekarang = "0" + bulanSekarang
        const tahunDanBulanSekarang = tahunSekarang + "-" + bulanSekarang

        const tahunDanBulan = tanggal
        let currentDate
        if(tahunDanBulan == tahunDanBulanSekarang) currentDate = true //cek klo tanggal yang dipilih itu bulan sekarang atau bukan

        res.render("bimbel", {data, tahunDanBulan, currentDate})
    }
    
})

route.post("/", async (req, res)=>{
    const {nama} = req.body
    cekTahun().then(async(value)=>{
        await db.pesertaBimbel.create({
            data: {
                nama,
                bulanId: value.bulan.id,
            }
        })
        res.redirect("/bimbel")
    })
})

route.get("/bayar/:bimbelId", async (req, res)=>{
    const {bimbelId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]
    const x = await db.pesertaBimbel.update({
        where: {
            id: Number(bimbelId)
        },
        data: {
            sudahBayar: true,
            tanggalBayarBulanan: tanggal + " " + bulan
        }
    })
    
    const y = await db.bulan.findFirst({
        where: {
            id: x.bulanId
        },
        select: {
            total: true
        }
    })

    await db.bulan.update({
        where: {
            id: x.bulanId
        },
        data: {
            total: y.total + hargaBulanBimbel
        }
    })
    res.redirect("/bimbel")
})

route.get("/cancel/:bimbelId", async (req, res)=>{
    const {bimbelId} = req.params
    const x = await db.pesertaBimbel.update({
        where: {
            id: Number(bimbelId)
        },
        data: {
            sudahBayar: false,
            tanggalBayarBulanan: ""
        }
    })

    const y = await db.bulan.findFirst({
        where: {
            id: x.bulanId
        },
        select: {
            total: true
        }
    })

    await db.bulan.update({
        where: {
            id: x.bulanId
        },
        data: {
            total: y.total - hargaBulanBimbel
        }
    })
    res.redirect("/bimbel")
})

route.get("/pendaftaran/:bimbelId", async (req, res)=>{
    const {bimbelId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]
    const x = await db.pesertaBimbel.update({
        where: {
            id: Number(bimbelId)
        },
        data: {
            pendaftaran: true,
            tanggalBayarPendaftaran: tanggal + " " + bulan
        }
    })

    const y = await db.bulan.findFirst({
        where: {
            id: x.bulanId
        },
        select: {
            total: true
        }
    })

    await db.bulan.update({
        where: {
            id: x.bulanId
        },
        data: {
            total: y.total + hargaDaftarBimbel
        }
    })
    res.redirect("/bimbel")
})

module.exports = route