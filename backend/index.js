const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./config/db")


//middlewares
app.use(cors());

app.use(express.json())


app.get("/api-endpoint",(req,res)=>{
    res.send("api is working fine")
})

app.use("/api/meetings",require("./routes/meetings"))



//routes



app.listen(process.env.port,async()=>{
    connection()
    console.log(`server running on port:${process.env.port}`)
})