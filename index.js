require('dotenv').config();
const express=require("express")
const app =express()
const router=require("./routes/blog-routes")


require("./db")

const cors=require("cors")

app.use(cors())
app.use(express.json())

app.use('/api/blogs',router)

const PORT=process.env.PORT

app.use("/api",(req,res)=>{
res.send("hello World")
})

app.listen(PORT,()=>{
    console.log(`App is Running at:${PORT}`)
})