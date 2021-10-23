const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const Todo = require('../models/todo')
const todoService = require('../services/todos')

router.get("/", async (req, res) => {
    todoService.getTodos().then((todos) => {
        res.send(todos);
    });

})

router.post("/", async (req, res) => {
    const data = req.body;
    todoService.saveTodo(data).then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.status(400);
        res.send(err)
    })

})

router
    .route("/:id")
    .get(async (req, res) => {
        const user = await userService.getById(req.params.id);
        if(!user) {
            res.status(404);
            res.send();
        }
        res.send(user);
    })
    .put(async (req, res) => {
        const data = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { $set: { username: data.username}}, { new: true });
        res.send(user);
    })
    .delete(async (req, res) => {
        const user = await User.deleteOne({ _id: req.params.id });
        res.send();
    })

module.exports = router