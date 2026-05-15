const express = require("express")
require('dotenv').config()
const cors = require("cors")



const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

app.use("/", require("./routes/currencyConversionRouter"))



app.listen(9595, ()=>{
    console.log(`listening at Port 9595 [http://localhost:9595]`)
})