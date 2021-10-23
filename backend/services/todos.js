const Todo = require("../models/todo");

async function getTodos() {
    return Todo.find();
}

async function saveTodo(data) {
    const newTodo = new Todo(data);
    return newTodo.save();
}

module.exports = { getTodos, saveTodo }