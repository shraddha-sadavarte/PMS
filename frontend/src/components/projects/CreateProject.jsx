import { useState } from "react";
import { createProject } from "../../api/projectApi";

const CreateProject = ({ token }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject({ name }, token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Project Name" onChange={(e) => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProject;
