import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskListing from './components/TaskListing';
import TaskCreation from './components/TaskCreation';
import TaskEditing from './components/TaskEditing';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskDeleted = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };



    const handleTaskStatusChanged = (taskId) => {
    // Find the task with the given taskId
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Toggle the status (assuming your status is either 'Completed' or 'Not Completed')
        task.status = task.status === 'Completed' ? 'Not Completed' : 'Completed';
      }
      return task;
    });

    // Update the state with the modified tasks
    setTasks(updatedTasks);

    console.log(`Task status changed for task with ID ${taskId}`);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TaskListing tasks={tasks} onTaskCreated={handleTaskCreated} onTaskDeleted={handleTaskDeleted} onTaskStatusChanged={handleTaskStatusChanged}/>}
        />
        <Route path="/taskCreation" element={<TaskCreation onTaskCreated={handleTaskCreated} />} />
        <Route
          path="/taskEditing/:taskId"
          element={<TaskEditing onTaskUpdated={handleTaskUpdated} tasks={tasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
