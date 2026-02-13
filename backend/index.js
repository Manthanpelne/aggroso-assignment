const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./config/db")


//middlewares

app.use(cors({
  origin: [
    "http://localhost:5173", // For your local development
    "https://stately-cassata-87348e.netlify.app" // For your live site
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


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