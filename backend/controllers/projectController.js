import Project from "../models/Project.js";
import User from "../models/User.js";

// Create Project and initialize progress
export const createProject = async (req, res) => {
  try {
    const { name, description, deadline, assignedTo } = req.body;

    const progress = assignedTo.map(userId => ({
      user: userId,
      percent: 0,
    }));

    const newProject = new Project({ name, description, deadline, assignedTo, progress });
    await newProject.save();

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ error: "Failed to create project", details: err.message });
  }
};

// Get projects for logged-in user
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ assignedTo: userId })
      .populate("progress.user", "username email")
      .populate("assignedTo", "username");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user projects", details: err.message });
  }
};

// Admin: Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("progress.user", "username email")
      .populate("assignedTo", "username");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all projects", details: err.message });
  }
};

// User: Update own progress on a project
export const updateProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { percent } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const progressEntry = project.progress.find(p => p.user.toString() === userId);
    if (!progressEntry) return res.status(403).json({ error: "You are not assigned to this project" });

    progressEntry.percent = percent;
    await project.save();

    res.status(200).json({ message: "Progress updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress", details: err.message });
  }
};

//update project
export const updateProject = async (req,res) => {
  try{
    const {id} = req.params;
    const {name, description, deadline, assignedTo} = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {name, description, deadline, assignedTo},
      {new:true}
    ). populate("progress.user", "username");

    res.json(updatedProject);
  } catch(error) {
    res.status(500).json({message: "Failed to update project", error});
  }
};

//delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
