import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "./models/TaskModel.js";

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

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.get("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
});

app.post("/api/tasks", async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.status(201).json(task);
});

app.put("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
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
