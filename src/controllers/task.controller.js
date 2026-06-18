import taskModel from "../models/task.model.js";
import mongoose from "mongoose";
import express from "express";

async function createTask(req, res) {
  try {
    const {
      title,
      description,
      status = "pending",
      priority = "medium",
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Title and Description are required",
      });
    }
    console.log("------------------------");

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        error: "You entered a status that is not defined",
      });
    }

    console.log("------------------------");

    if (priority !== "low" && priority !== "medium" && priority !== "high") {
      return res.status(400).json({
        error: "You entered a priority that is not defined",
      });
    }

    const taskData = await taskModel.create({
      title,
      description,
      status,
      priority,
    });

    if (!taskData) {
      return res.status(500).json({
        error: "Something went wrong",
      });
    }

    res.status(200).json({
      message: "Task created successfully",
      Data: taskData,
    });
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
}

async function getAllTask(req, res) {
  try {
    const priority = req.query.priority
    const filter = {}
    if(priority){
        filter.priority = priority
    }
    const taskData = await taskModel.find(filter);

    if (!taskData) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.status(200).json({
      message: "Data fetched successfully",
      Data: taskData,
    });
  } catch (err) {
    error: err.message;
  }
}

async function updateTask(req, res) {
  try {
    const { title, description, status, priority } = req.body;
    console.log("req.body",req.body);
    console.log('title',title);
    // console.log({
    //   title,
    //   description,
    //   status,
    //   priority,
    // });
    const id = req.params.id;

    console.log("--------------------");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ID format",
      });
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
      return res.status(400).json({
        error: "Task does not exist",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      Data: taskData,
    });
  } catch (err) {
    error: err.message;
  }
}

async function deleteTask(req, res){
    
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error : "Invalid ID format"
            })
        }
    
        const taskData = await taskModel.findOneAndDelete({
            _id:id
        })
        if(!taskData){
            return res.status(400).json({
                error : "Task already deleted or does not exists"
            })
        }
    
        res.status(200).json({
            message : "taks deleted successfully",
            Data : taskData
        })
    } catch (err) {
        error : err.message
    }


}

async function getTask(req , res){

    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error : "Invalid ID format"
            })
        }
    
        const taskData = await taskModel.findOne({_id:id})
        if(!taskData){
            return res.status(400).json({
                error : "Task not found"
            })
        }
    
        res.status(200).json({
            message : "Data fetched successfully",
            Data : taskData
        })
    } catch (err) {
        error : err.message
    }
}

export default {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
  getTask
};
