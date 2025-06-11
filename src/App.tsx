import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'antd/dist/reset.css';

function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Hello Kaiburr ✨</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
