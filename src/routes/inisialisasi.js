const router = require("express").Router

const route = router()

route.get("/", (req, res)=>{
    res.render("inisialisasi")
})

module.exports = route