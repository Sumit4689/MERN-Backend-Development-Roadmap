const express = require("express")
const router = express.Router()
const {getNotes, addNote, deleteNote} = require("../controllers/notesController")

router.route("/getAll").get(getNotes)
router.route("/addNote").post(addNote)
router.route("/deleteNote").delete(deleteNote)

module.exports = router