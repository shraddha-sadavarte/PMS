import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProject = ({ token }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warn("Project name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects", // Adjust if needed
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        toast.success("Project created successfully ✅");
        setName("");
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (error) {
      console.error("Project creation failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to create project ❌"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProject;
