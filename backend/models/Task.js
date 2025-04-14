import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    // title: String,
    // description: String,
    // status: {
    //     type: String,
    //     default: "incomplete"
    // },
    // assignTo: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started",
      },
});

export default mongoose.model("Task", taskSchema);