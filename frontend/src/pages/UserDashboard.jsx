import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import UserNavbar from "../components/UserNavbar";
import '../styles/user.css';

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
    <>
      <UserNavbar />
      <div className="user-page">
        <div className="user-container">
          <h1 className="user-title">Welcome to Your Dashboard!</h1>
          <h2 className="subheading">Your Assigned Tasks</h2>
          <div className="task-grid">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                </div>
              ))
            ) : (
              <p>No tasks assigned yet.</p>
            )}
          </div>
          {/* <button
            className="logout-button"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
