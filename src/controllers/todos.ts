import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOs: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOs.push(newTodo);
  res.status(200).json({
    message: 'Created the new todo.',
    createdTodo: newTodo,
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOs });
};

// use a generic type to indicate a param of id
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOs.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo');
  }

  TODOs[todoIndex] = new Todo(TODOs[todoIndex].id, updatedText);
  res.json({
    message: 'Updated',
    updateTodo: TODOs[todoIndex],
  });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
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
