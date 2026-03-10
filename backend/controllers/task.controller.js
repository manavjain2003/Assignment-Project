const TaskModal = require('../models/Task.model');

const createTask = async (req, res) => {
    try {
        const { title, description, assignedUser, projectid } = req.body;
        const newTask = new TaskModal({ title, description, assignedUser, projectid });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while creating task, please try again later" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModal.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching tasks, please try again later" });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await TaskModal.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error while updating task status, please try again later" });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus
};