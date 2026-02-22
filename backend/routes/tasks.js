const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: 'Set up project repo', description: 'Create github repo and push initial code', completed: true, createdAt: new Date('2024-01-10'), priority: 'high' },
  { id: 2, title: 'Design the UI', description: 'Wireframe the main screens and pick color scheme', completed: false, createdAt: new Date('2024-01-11'), priority: 'medium' },
  { id: 3, title: 'Write unit tests', description: 'Add tests for the main components', completed: false, createdAt: new Date('2024-01-12'), priority: 'low' }
];
let nextId = 4;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'priority must be low, medium or high' });
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

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'task not found' });
  }
  const { title, description, priority, completed } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'title cant be empty' });
  }
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'invalid priority value' });
  }
  const updated = { ...tasks[taskIndex] };
  if (title !== undefined) updated.title = title.trim();
  if (description !== undefined) updated.description = description.trim();
  if (priority !== undefined) updated.priority = priority;
  if (completed !== undefined) updated.completed = completed;
  tasks[taskIndex] = updated;
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.json({ message: 'task deleted' });
});

router.patch('/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  task.completed = !task.completed;
  res.json(task);
});

module.exports = router;
