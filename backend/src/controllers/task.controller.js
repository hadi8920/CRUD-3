import taskModel from "../models/task.model.js";
import mongoose from "mongoose";
import express from "express";

async function createTask(req, res) {
    const {
      title,
      description,
      status = "pending",
      priority ="medium",
    } = req.body;

    if (!title || !description) {
      throw new Error("Title and Description are required")
    }
    console.log("------------------------");

    if (status !== "pending" && status !== "completed") {
      throw new Error("You entered a status that is not defined")
    }

    console.log("------------------------");

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      throw new Error("You entered a priority that is not defined")
    }

    const taskData = await taskModel.create({
      title,
      description,
      status,
      priority,
    });

    if (!taskData) {
      throw new Error("Something went wrong")
    }

    res.status(200).json({
      message: "Task created successfully",
      data: taskData,
    });
  
}

async function getAllTask(req, res) {
  console.log("--------------------------------")
    const { priority, sort, order } = req.query;
    const sortObj = {};
    const filter = {};
    if (sort) {
      sortObj[sort] = order === "desc" ? -1 : 1;
    }
    if (priority) {
      filter.priority = priority;
    }
    const taskData = await taskModel.find(filter).sort(sortObj);

    if (!taskData) {
      throw new Error("Something went wrong");
    }
    res.status(200).json({
      message: "Data fetched successfully",
      data: taskData,
    });
}

async function updateTask(req, res) {
    const { title, description, status, priority } = req.body;
    console.log("req.body", req.body);
    console.log("title", title);
    // console.log({
    //   title,
    //   description,
    //   status,
    //   priority,
    // });
    const id = req.params.id;

    console.log("--------------------");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID Format")
    }
    console.log(id);
    console.log("--------------------");

    const taskData = await taskModel.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
        status: status,
        priority: priority,
      },
      { new: true },
    );

    console.log(taskData);
    console.log("--------------------");

    if (!taskData) {
      throw new Error("Task does not exist")
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: taskData,
    });
}

async function deleteTask(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID Format")
    }

    const taskData = await taskModel.findOneAndDelete({
      _id: id,
    });
    if (!taskData) {
      throw new Error("Task already deleted or does not exists")
    }

    res.status(200).json({
      message: "taks deleted successfully",
      data: taskData,
    });
}

async function getTask(req, res) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID Format")
    }

    const taskData = await taskModel.findOne({ _id: id });
    if (!taskData) {
      throw new Error("Task not found")
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data: taskData,
    });
}

export default {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getTask,
};
