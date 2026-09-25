import React, { useState, useEffect } from "react";
import { getTasks, toggleTask } from "../api/tasksApi";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li 
            key={task._id} 
            style={{ textDecoration: task.done ? "line-through" : "none", marginBottom: "8px" }}
          >
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => handleToggle(task._id)} 
              style={{ marginRight: "8px" }}
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}