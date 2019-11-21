const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

//Get all tasks
router.get('/tasks', async (req, res)=> {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(err){
        res.json({message: err});
    }
});

//Get 1 task
router.get('/tasks/:taskID', async (req, res) => {
    try{
        const taskByID = await Task.findById(req.params.taskID);
        res.json(taskByID);
    }catch(err){
        res.json({message: err});
    }
});

//Post 1 task
router.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title
        });
    try{
        const savedTask = await task.save();
        res.json(savedTask);
    }catch(err){
        res.json({message: err});
    }
});

//Delete 1 task
router.delete('/tasks/:taskID', async (req, res) => {
    try{
        const deleteTask = await Task.deleteOne({_id: req.params.taskID});
        res.json(deleteTask);
    }catch(err){
        res.json({message: err});
    }
});

//Patch 1 task
router.patch('/tasks/:taskID', async (req, res) => {
    try{
        const updateTask = await Task.updateOne(
            { _id: req.params.taskID }, 
            { $set: 
                {
                    title: req.body.title,
                    isDone: req.body.isDone
                }
        });
        res.json(updateTask);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;