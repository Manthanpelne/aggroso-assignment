const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./config/db")


//middlewares

const allowedOrigins = ['http://localhost:5173/','https://stately-cassata-87348e.netlify.app/'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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