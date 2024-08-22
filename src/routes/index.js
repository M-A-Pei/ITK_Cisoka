const router = require("express").Router
const bimbelRoutes = require("./bimbel")
const komputerRoutes = require("./komputer")
const inggrisRoutes = require("./inggris")
const bulananRoutes = require("./bulanan")
const authRoutes = require("./auth")

const route = router()

route.use("/auth", authRoutes)
route.use("/bimbel", bimbelRoutes)
route.use("/komputer", komputerRoutes)
route.use("/inggris", inggrisRoutes)
route.use("/", bulananRoutes)

module.exports = route