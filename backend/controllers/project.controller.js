const ProjectModal = require('../models/Project.model');

const createProject = async (req, res) => {
    try {
                  const { projectName, users } = req.body;
             const newProject = new ProjectModal({ projectName, users });
              await newProject.save();
        res.status(201).json({ message: "Project created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while creating project, please try again later" });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await ProjectModal.find().populate('users');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching projects, please try again later" });
    }
};


module.exports = { createProject, getProjects };