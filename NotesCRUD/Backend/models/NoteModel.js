const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ""
    },
    tag: {
        type: String,
        default: "General"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("notes", NoteSchema)