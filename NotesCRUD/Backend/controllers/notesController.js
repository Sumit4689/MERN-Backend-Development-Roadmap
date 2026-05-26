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
        // const existingNote = await notes.findOne({
        //     title,
        //     content,
        //     tag
        // })

        // if (existingNote) {
        //     const note = await notes.updateOne(
        //         { _id: existingNote._id },
        //         {
        //             $set: {
        //                 title,
        //                 content,
        //                 tag
        //             }
        //         })

        //     return res.status(200).json({
        //         message : "note updated successfully"
        //     })
        // }

        const note = await notes.create({
            title,
            content,
            tag
        })

        if (note) {
            res.status(201).json({
                message: "note Saved Successfully",
                id : note._id
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

module.exports = { getNotes, addNote }