const express = require("express")
const router = express.Router()

router.get("/getAll", require("../controllers/notesController"))
router.post("/addNote", require(""))

module.exports = router