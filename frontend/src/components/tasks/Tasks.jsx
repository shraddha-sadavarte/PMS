import React, { useEffect, useState } from "react";
import { getTasks } from "../../api/taskApi";
import '../../styles/tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getTasks(token).then(res => setTasks(res.data));
    }
  }, []);

  return (
    <div className="tasks-page">
      <h2>Your Tasks</h2>
      <div className="task-list">
        {tasks.length > 0 ? tasks.map(task => (
          <div className="task-item" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>Status: {task.status}</span>
          </div>
        )) : <p>No tasks available.</p>}
      </div>
    </div>
  );
};

export default Tasks;
