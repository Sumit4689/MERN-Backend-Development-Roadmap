const express = require("express");
const router = express.Router()
const {addition, subtraction, multiplication, division} =  require("../controllers/calculatorController")

router.post("/add", addition)
router.post("/subtract", subtraction)
router.post("/multiply", multiplication)
router.post("/divide", division)

module.exports = router

