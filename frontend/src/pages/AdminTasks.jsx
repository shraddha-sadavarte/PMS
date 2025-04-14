import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import '../styles/adminTasks.css';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getTasks(token).then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h4>{task.title}</h4>
            <p>Assigned to: {task.user?.username}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTasks;
