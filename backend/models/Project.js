import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    deadline: Date,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    progress: [
        {
            user: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
            percent: {type: Number, default: 0},
        },
    ],
});

export default mongoose.model("Project", projectSchema);