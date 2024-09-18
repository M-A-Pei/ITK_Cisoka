const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")
const BULAN = require("../static/BULAN")
const {hargaBulanInggris, hargaDaftarInggris} = require("../static/HARGA")

const route = router()

route.get("/:date?", async(req, res)=>{
    const isLogin = req.session.isLogin
    if(!isLogin){
        return res.redirect("/auth/login")
    }
    const tanggal = req.params.date
    if(!tanggal){
        cekTahun().then(async(value)=>{
            const data = await db.pesertaInggris.findMany({
                where: {
                    bulanId: value.bulan.id,
                }
            })
    
            const date = new Date()
            const tahun = date.getFullYear()
            let bulan = (date.getMonth() + 1)
            if(bulan < 10) bulan = "0" + bulan
            const tahunDanBulan = tahun + "-" + bulan
    
            res.render("inggris", {data, tahunDanBulan, currentDate: true})
        })
    }else{
        const tahun = tanggal.split("-")[0]
        const bulan = BULAN[tanggal.split("-")[1]-1]

        const data = await db.pesertaInggris.findMany({
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

        res.render("inggris", {data, tahunDanBulan, currentDate})
    }
    
})

route.post("/", async (req, res)=>{
    const {nama} = req.body
    cekTahun().then(async(value)=>{
        await db.pesertaInggris.create({
            data: {
                nama,
                bulanId: value.bulan.id
            }
        })
        res.redirect("/inggris")
    })
})

route.get("/bayar/:inggrisId", async (req, res)=>{
    const {inggrisId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]
    const x = await db.pesertaInggris.update({
        where: {
            id: Number(inggrisId)
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
            total: y.total + hargaBulanInggris
        }
    })
    res.redirect("/inggris")
})

route.get("/cancel/:inggrisId", async (req, res)=>{
    const {inggrisId} = req.params
    const x = await db.pesertaInggris.update({
        where: {
            id: Number(inggrisId)
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
            total: y.total - hargaBulanInggris
        }
    })
    res.redirect("/inggris")
})

route.get("/pendaftaran/:inggrisId", async (req, res)=>{
    const {inggrisId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]

    const {nama} = await db.pesertaInggris.findFirst({
        where: {
            id: Number(inggrisId)
        },
        select: {
            nama: true
        }
    })
    const x = await db.pesertaInggris.updateMany({
        where: {
            nama
        },
        data: {
            pendaftaran: true,
            tanggalBayarPendaftaran: tanggal + " " + bulan
        }
    })

    

    const y = await db.bulan.findFirst({
        where: {
            pesertaInggris: {
                some: {
                    id: Number(inggrisId)
                }
            }
        },
    })

    await db.bulan.update({
        where: {
            id: y.id
        },
        data: {
            total: y.total + hargaDaftarInggris
        }
    })
    res.redirect(req.get('Referer'))
})

route.get("/cancelPendaftaran/:inggrisId", async (req, res)=>{
    const {inggrisId} = req.params

    const {nama} = await db.pesertaInggris.findFirst({
        where: {
            id: Number(inggrisId)
        },
        select: {
            nama: true
        }
    })

    await db.pesertaInggris.updateMany({
        where: {
            nama
        },
        data: {
            pendaftaran: false,
            tanggalBayarPendaftaran: ""
        }
    })
    const y = await db.bulan.findFirst({
        where: {
            pesertaInggris: {
                some: {
                    id: Number(InggrisId)
                }
            }
        },
    })
    await db.bulan.update({
        where: {
            id: y.id
        },
        data: {
            total: y.total - hargaDaftarInggris
        }
    })
    res.redirect(req.get('Referer'))
})

route.get("/delete/:InggrisId", async (req, res)=>{
    const {InggrisId} = req.params
    
    const getNama = await db.pesertaInggris.findFirst({
        where: {
            id: Number(InggrisId)
        },
        select: {
            nama: true
        }
    })

    await db.pesertaInggris.deleteMany({
        where: {
            id : {
                gte: Number(InggrisId)
            },
            nama: getNama.nama
        }
    })
    res.redirect(req.get('Referer'))
})

module.exports = route