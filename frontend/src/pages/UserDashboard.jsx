import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";

const UserDashboard = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getTasks(token);
      setTasks(response.data);
    }
    fetchData();
  }, [token]);

  return (
    
    <div>
      <div className="p-4">Welcome to the User Dashboard!</div>;
      <h2>Your Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id}>{task.title}</div>
      ))}
    </div>
  );
};

export default UserDashboard;
