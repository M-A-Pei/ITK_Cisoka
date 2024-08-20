const express = require("express")
const dotenv = require("dotenv")
const hbs = require("hbs")
const path = require("path")

dotenv.config()
const app = express()

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src", "pages"))
hbs.registerPartials(path.join(__dirname, "src", "pages", "props"))

const port = process.env.PORT || 3000

app.get("/", (req, res)=>{
    res.render("bulanan")
})

app.get("/komputer", (req, res)=>{
    res.render("komputer")
})

app.get("/bimbel", (req, res)=>{
    res.render("bimbel")
})

app.get("/inggris", (req, res)=>{
    res.render("inggris")
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

