import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TaskFilter from './components/TaskFilter';
import { getTasks, createTask, deleteTask, toggleTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      setError('Could not load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      setError('Could not delete task');
    }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id);
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    } catch (e) {
      setError('Could not update task');
    }
  }

  function getFiltered() {
    if (filter === 'completed') return tasks.filter(t => t.completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{color:'red'}}>{error}</p>}
      <TaskFilter current={filter} onChange={setFilter} />
      {loading ? <p>Loading...</p> : (
        getFiltered().map(t => (
          <TaskItem key={t.id} task={t} onToggle={handleToggle} onEdit={() => {}} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default App;
