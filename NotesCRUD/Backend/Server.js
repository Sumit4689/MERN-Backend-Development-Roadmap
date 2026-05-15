const express =  require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require("./config/dbConnection")

connectDB();

const app = express()

app.use(express.json())

// app.use("/notes", require())

app.listen(14526, ()=>{
    console.log(`Server is listening at port 14526 [http://localhost:14526]`)
})