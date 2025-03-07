const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Corrected model import

// Create a project
router.post('/', async (req, res, next) => {
    try {
        const { title, category, desc, skills, liveProject, github, img } = req.body;

        if (!title || title.length < 3 || title.length > 50) {
            return res.status(400).json({ message: "Title must be between 3 and 50 characters." });
        }

        const project = await Project.create({ title, category, desc, skills, liveProject, github, img });
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
});

// Get all projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

// Get projects by category
router.get('/category/', async (req, res, next) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const projects = await Project.find(query);
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

// Get a project by ID
router.get('/:id', async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        next(err);
    }
});

// Update a project
router.patch('/:id', async (req, res, next) => {
    try {
        const { title, category, desc, skills, liveProject, github, img } = req.body;

        if (title && (title.length < 3 || title.length > 50)) {
            return res.status(400).json({ message: "Title must be between 3 and 50 characters." });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, category, desc, skills, liveProject, github, img },
            { new: true, runValidators: true }
        );

        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.json(project);
    } catch (err) {
        next(err);
    }
});

// Delete a project
router.delete('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
});
// Get projects by category
// Get projects by category (handling spaces)
router.get('/category/:category', async (req, res, next) => {
    try {
        const category = req.params.category.replace(/%20/g, ' '); // Convert encoded spaces back to normal spaces
        const projects = await Project.find({ category });

        if (projects.length === 0) {
            return res.status(404).json({ message: "No projects found for this category." });
        }

        res.json(projects);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
