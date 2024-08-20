const express = require("express")
const router = express.Router

const route = router()

route.get("/", (req, res)=>{
    res.render("komputer")
})

module.exports = route