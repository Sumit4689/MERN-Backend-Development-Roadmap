const express = require("express")
const router = express.Router()

router.get("/getAll", require("../controllers/notesController"))

module.exports = router