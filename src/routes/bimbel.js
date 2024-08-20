const router = require("express").Router
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")

const route = router()

route.get("/", (req, res)=>{
    cekTahun().then(async(value)=>{
        const data = await db.pesertaBimbel.findMany({
            where: {
                bulanId: value.bulan.id,
            }
        })
        res.render("bimbel", {data})
    })
})

route.post("/", async (req, res)=>{
    const {nama} = req.body
    cekTahun().then(async(value)=>{
        const response = await db.pesertaBimbel.create({
            data: {
                nama,
                sudahBayar: false,
                bulanId: value.bulan.id
            }
        })

        res.redirect("/bimbel")
    })
    
    

})

module.exports = route