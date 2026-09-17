import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build REST API", done: false },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body.title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Not found" });
  task.title = req.body.title;
  task.done = req.body.done;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

app.get("/about", (req, res) => {
  res.send("This is the About route");
});

app.get("/api/interns", (req, res) => {
  res.json({ interns: ["Ali", "Sara", "Bilal"] });
});

app.get("/api/interns/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Sample Intern" });
});

app.get("/api/search", (req, res) => {
  res.json({ query: req.query.q });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
