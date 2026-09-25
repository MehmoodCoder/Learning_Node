import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import Task from "./models/TaskModel.js";
import authRoutes from "./routers/auth.js";
import protect from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// let tasks = [
//   { id: 1, title: "Learn Express", done: false },
//   { id: 2, title: "Build REST API", done: false },
// ];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/api/tasks", protect, async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});
3;

app.get("/api/tasks/:id", protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

app.post("/api/tasks", protect, async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

app.put("/api/tasks/:id", protect, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format or data" });
  }
});

app.delete("/api/tasks/:id", protect, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

app.patch("/api/tasks/:id/toggle", protect, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });
    
    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
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

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
