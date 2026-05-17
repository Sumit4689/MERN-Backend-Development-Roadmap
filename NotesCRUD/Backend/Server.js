const express =  require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require("./config/dbConnection")
const cors = require('cors')

connectDB();

const app = express()

app.use(cors())

cors.ge

app.use(express.json())

app.use("/notes", require("./routes/notesRouter"))

app.listen(14526, ()=>{
    console.log(`Server is listening at port 14526 [http://localhost:14526]`)
})