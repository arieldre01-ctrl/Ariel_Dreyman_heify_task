const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Set up project repo', description: 'Create github repo and push initial code', completed: true, createdAt: new Date('2024-01-10'), priority: 'high' },
  { id: 2, title: 'Design the UI', description: 'Wireframe the main screens', completed: false, createdAt: new Date('2024-01-11'), priority: 'medium' }
];
let nextId = 3;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date(),
    priority: priority || 'medium'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
