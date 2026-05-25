const notes = require("../models/NoteModel")

const getNotes = async(req, res) => {
    try {
        const allNotes = await notes.find()

        if(!allNotes){
            res.status(400).json({
                message: "Notes not found"
            })
        }

        res.status(200).json(allNotes)
        
    } catch (error) {
        
    }
    

}

const addNote = async(req, res) => {
    try {
        const {title, content, tag} = req.body
        console.log(title)
        const note = notes.create({
            title,
            content,
            tag
        })

        if (note){
            res.status(201).json({
                message : "Noted Saved Successfully"
            })
        }else{
            res.status(400).json({
                message : "invalid data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Failed to save note"
        })
    }
}

module.exports = {getNotes, addNote}