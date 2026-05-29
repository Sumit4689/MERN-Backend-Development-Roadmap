const notes = require("../models/NoteModel")

const getNotes = async (req, res) => {
    try {
        const allNotes = await notes.find()

        if (allNotes.length === 0) {
            return res.status(400).json({
                message: "Notes not found"
            })
        }

        res.status(200).json(allNotes)

    } catch (error) {
        console.log(error)
    }


}

const addNote = async (req, res) => {
    try {
        const { title, content, tag } = req.body

        const note = await notes.create({
            title,
            content,
            tag
        })

        if (note) {
            res.status(201).json({
                message: "note Saved Successfully",
                id : note._id,
                note : note
            })
        } else {
            res.status(400).json({
                message: "invalid data"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to save note"
        })
    }
}

const deleteNote = async (req, res) =>{
    try {
        const id = req.body;
    
        if(!id){
            res.status(400).json({
                message : "invalid note id"
            })
        }

        const response = await notes.findByIdAndDelete(id);

        if(response){
            res.send(200).json({
                message: "note deleted successfully"
            })
            console.log(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Failed to delete note"
        })
    }
}

module.exports = { getNotes, addNote }