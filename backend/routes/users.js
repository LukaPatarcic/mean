const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const User = require('../models/user')
const userService = require('../services/users')

router.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
})

router.post("/", async (req, res) => {
    const data = req.body;
    console.log(data);
    const user = new User({
        username: data.username
    });

    const saveData = await user.save();
    res.send(saveData);
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