const express = require("express")
const dotenv = require("dotenv")
const hbs = require("hbs")
const path = require("path")
const routes = require("./src/routes/index")
const db = require("./src/libs/db")

dotenv.config()
const app = express()

app.use(express.urlencoded({extended : true}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src", "pages"))
hbs.registerPartials(path.join(__dirname, "src", "pages", "props"))

const port = process.env.PORT || 3000
app.use(routes)
app.get("/test", async(req, res)=>{
    res.send("hi")
})

app.listen(port, async()=>{
    try {
        await db.$connect()
        console.log(`listening on port ${port}`)
    } catch (error) {
        await db.$disconnect()
    }
    
})

