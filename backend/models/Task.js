import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        default: "incomplete"
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

export default mongoose.model("Task", taskSchema);