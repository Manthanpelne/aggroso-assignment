const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./config/db")


//middlewares

app.use((req, res, next) => {
  // 1. Allow the origin (Wildcard is fine for testing)
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  // 2. Allow the methods
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, POST, GET, PATCH, PUT, OPTIONS"
  );
  
  // 3. Allow Credentials and Headers
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // 4. CRITICAL: Handle the Preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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