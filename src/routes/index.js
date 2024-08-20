const router = require("express").Router
const bimbelRoutes = require("./bimbel")
const komputerRoutes = require("./komputer")
const inggrisRoutes = require("./inggris")
const db = require("../libs/db")
const cekTahun = require("../middleware/cekTahun")

const route = router()

route.get("/", async(req, res)=>{
    cekTahun().then(res.render("bulanan"))
})
route.use("/bimbel", bimbelRoutes)
route.use("/komputer", komputerRoutes)
route.use("/inggris", inggrisRoutes)

module.exports = route