const Task=require('../models/task')
//create task
const createTask = async (req, res) => {
  try {
    const { taskName, description, isCompleted } = req.body;
    const task = new Task({ taskName, description, isCompleted });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.log( error.message )
    res.status(400).json({ error: error.message });
  }
};

//get a task by id
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) throw new Error("Task not found");
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get all the task
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, description, isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskName, description, isCompleted },
      { new: true }
    );
    if (!updatedTask) throw new Error("Task not found");
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) throw new Error("Task not found");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
