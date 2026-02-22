import React, { useState } from 'react';

function App() {
  const [tasks] = useState([
    { id: 1, title: 'test task', completed: false, priority: 'medium', description: '' }
  ]);

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
