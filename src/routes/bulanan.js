const router = require("express").Router
const cekTahun = require("../middleware/cekTahun")

const route = router()

route.get("/:date?", async(req, res)=>{
    cekTahun().then(()=>loadBulanan(req, res))
})

async function loadBulanan(req, res){
    const {date} = req.params
    if(!date){
        res.render("bulanan")
    }else{
        res.render("bulanan")
    }
}

module.exports = route