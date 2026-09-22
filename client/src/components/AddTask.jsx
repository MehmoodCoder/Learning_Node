import React, { useState, useEffect } from "react";
import { getTasks, createTask } from "../api/tasksApi";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    getTasks().then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({ title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task List</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Add Task
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
