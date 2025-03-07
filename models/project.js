const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    skills: {
        type: [String], // Corrected to an array of strings
        required: true
    },
    liveProject: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
