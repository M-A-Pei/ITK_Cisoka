const express = require("express")
const dotenv = require("dotenv")
const hbs = require("hbs")
const path = require("path")
const routes = require("./src/routes/index")
const db = require("./src/libs/db")
const session = require("express-session")

dotenv.config()
const app = express()

app.use(express.urlencoded({extended : true}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "src", "pages"))
hbs.registerPartials(path.join(__dirname, "src", "pages", "props"))

app.use(session({
    name: "data",
    secret: process.env.SECRET || "krabypattysecretformula",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
  )

const port = process.env.PORT || 3000

app.get("/test", async(req, res)=>{
    req.session.isLogin = true
    res.send(req.session.isLogin)
})
app.use(routes)


app.listen(port, async()=>{
    try {
        await db.$connect()
        console.log(`listening on port ${port}`)
    } catch (error) {
        await db.$disconnect()
        console.log(error)
    }
    
})

