import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadTasks(); }, []);

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

  async function handleCreate(data) {
    try {
      const task = await createTask(data);
      setTasks(prev => [...prev, task]);
    } catch (e) { setError(e.message); }
  }

  async function handleUpdate(data) {
    try {
      const updated = await updateTask(editTask.id, data);
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
      setEditTask(null);
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) { setError('Could not delete task'); }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id);
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
    } catch (e) { setError('Could not update task'); }
  }

  function getFiltered() {
    if (filter === 'completed') return tasks.filter(t => t.completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  }

  const filteredTasks = getFiltered();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">Keep track of what matters</p>
      </header>
      <main className="app-main">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')}>×</button>
          </div>
        )}
        <section className="form-section">
          <TaskForm onSubmit={editTask ? handleUpdate : handleCreate} editTask={editTask} onCancel={() => setEditTask(null)} />
        </section>
        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks ({filteredTasks.length})</h2>
            <TaskFilter current={filter} onChange={setFilter} />
          </div>
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList tasks={filteredTasks} onToggle={handleToggle} onEdit={setEditTask} onDelete={handleDelete} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
