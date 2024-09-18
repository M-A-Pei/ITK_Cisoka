const router = require("express").Router
const bimbelRoutes = require("./bimbel")
const komputerRoutes = require("./komputer")
const inggrisRoutes = require("./inggris")
const bulananRoutes = require("./bulanan")
const authRoutes = require("./auth")
const inisialisasiRoutes = require("./inisialisasi")

const route = router()

route.use("/auth", authRoutes)
route.use("/bimbel", bimbelRoutes)
route.use("/komputer", komputerRoutes)
route.use("/inggris", inggrisRoutes)
route.use("/inisialisasi", inisialisasiRoutes)
route.use("/", bulananRoutes)

module.exports = route