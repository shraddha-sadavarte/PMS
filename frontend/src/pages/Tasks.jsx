import { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../api/taskApi";
import '../styles/tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTaskStatus(taskId, newStatus, token);
    const updated = tasks.map(task =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  useEffect(() => {
    getTasks(token).then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="task-page">
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
