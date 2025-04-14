import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
   try{
    const role = req.user.role;
    const userId = req.user.id;

    const projects = role ==="admin" 
    ? await Project.find().populate("assignedTo", "name")
    : await Project.find({ assignedTo: userId });

    res.json(projects);
   } catch (err) {
    res.status(500).json({message: "Error fetching projects"});
   }
};

export const createProject = async (req,res) => {
    try{
        const { name, description, deadline, assignedTo } = req.body;
        const project = new Project({name, description, deadline, assignedTo });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({message: " Failed to create project", error });
    }
};