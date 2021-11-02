"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOs = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOs.push(newTodo);
    res.status(200).json({
        message: 'Created the new todo.',
        createdTodo: newTodo,
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOs });
};
exports.getTodos = getTodos;
// use a generic type to indicate a param of id
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOs.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOs[todoIndex] = new todo_1.Todo(TODOs[todoIndex].id, updatedText);
    res.json({
        message: 'Updated',
        updateTodo: TODOs[todoIndex],
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOs.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo');
    }
    TODOs.splice(todoIndex, 1);
    res.json({
        message: 'Todo deleted',
    });
};
exports.deleteTodo = deleteTodo;
