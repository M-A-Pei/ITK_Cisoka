const router = require("express").Router

const route = router()

route.get("/login", (req, res)=>{
    res.render("login")
})

route.post("/login", (req, res)=>{
    const {password} = req.body

    console.log(password, "dan" ,process.env.PASSWORD)
    if(password == process.env.PASSWORD){
        req.session.isLogin = true
        res.redirect("/")
    }else{
        res.redirect("/auth/login")
    }
    
})

module.exports = route