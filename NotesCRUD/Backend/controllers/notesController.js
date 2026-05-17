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

module.exports = getNotes