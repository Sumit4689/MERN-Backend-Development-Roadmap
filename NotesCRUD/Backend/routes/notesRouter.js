const express = require("express")
const router = express.Router()
const {getNotes, addNote} = require("../controllers/notesController")

router.route("/getAll").get(getNotes)
router.route("/addNote").post(addNote)

module.exports = router