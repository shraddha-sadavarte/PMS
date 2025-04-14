import Task from "../models/Task.js";

export const getTasks = async (req,res) => {
    const tasks = await Task.find().populate("user","username email"); /*find({assignedTo:req.user.id});*/
    res.json(tasks);
};

export const createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
};

export const updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      const task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      task.status = status;
      await task.save();
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  };
  