const express = require('express')
const router = express.Router()
const {Converter} = require("../controllers/currencyConversionController")

router.post("/convert", Converter)

module.exports = router