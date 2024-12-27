import express from "express";
import Task from "../models/task.js";

const router = express.Router();

//create a task

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all task

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// updating a task

router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      updatedTask,
      {new: true}
    )
    res.status(200).json({
      message: "Task updated",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a task

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ messgae: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//mark as complete

router.patch("/:id/complete", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "completed" },
      { new: true }
    );
    res.status(200).json({
      message: "Task marked as completed",
      task: task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
