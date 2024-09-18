const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")
const BULAN = require("../static/BULAN")
const {hargaBulanKomputer, hargaDaftarKomputer} = require("../static/HARGA")

const route = router()

route.get("/:date?", async(req, res)=>{
    const isLogin = req.session.isLogin
    if(!isLogin){
        return res.redirect("/auth/login")
    }
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
                bulanId: value.bulan.id
            }
        })
        res.redirect("/komputer")
    })
})

route.get("/bayar/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]
    const x = await db.pesertaKomputer.update({
        where: {
            id: Number(komputerId)
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
            total: y.total + hargaBulanKomputer
        }
    })
    res.redirect("/komputer")
})

route.get("/cancel/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    const x = await db.pesertaKomputer.update({
        where: {
            id: Number(komputerId)
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
            total: y.total - hargaBulanKomputer
        }
    })
    res.redirect("/komputer")
})

route.get("/pendaftaran/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    const date = new Date()
    const tanggal = date.getDate()
    const bulan = BULAN[date.getMonth()]

    const {nama} = await db.pesertaKomputer.findFirst({
        where: {
            id: Number(komputerId)
        },
        select: {
            nama: true
        }
    })
    const x = await db.pesertaKomputer.updateMany({
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
            pesertaKomputer: {
                some: {
                    id: Number(komputerId)
                }
            }
        },
    })

    await db.bulan.update({
        where: {
            id: y.id
        },
        data: {
            total: y.total + hargaDaftarKomputer
        }
    })
    res.redirect(req.get('Referer'))
})

route.get("/cancelPendaftaran/:komputerId", async (req, res)=>{
    const {komputerId} = req.params

    const {nama} = await db.pesertaKomputer.findFirst({
        where: {
            id: Number(komputerId)
        },
        select: {
            nama: true
        }
    })

    await db.pesertaKomputer.updateMany({
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
            pesertaKomputer: {
                some: {
                    id: Number(komputerId)
                }
            }
        },
    })
    await db.bulan.update({
        where: {
            id: y.id
        },
        data: {
            total: y.total - hargaDaftarKomputer
        }
    })
    res.redirect(req.get('Referer'))
})

route.get("/delete/:komputerId", async (req, res)=>{
    const {komputerId} = req.params
    const getNama = await db.pesertaKomputer.findFirst({
        where: {
            id: Number(komputerId)
        },
        select: {
            nama: true
        }
    })
    await db.pesertaKomputer.deleteMany({
        where: {
            id : {
                gte: Number(komputerId)
            },
            nama: getNama.nama
        }
    })
    res.redirect(req.get('Referer'))
})

module.exports = route