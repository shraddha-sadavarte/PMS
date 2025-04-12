import Task from "../models/Task.js";

export const getTasks = async (req,res) => {
    const tasks = await Task.find({assignedTo:req.user.id});
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
};