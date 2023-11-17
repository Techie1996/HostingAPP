import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskListing = ({ tasks, onNewTask, onTaskCreated, onTaskDeleted, onTaskStatusChanged }) => {
  console.log('Rendering TaskListing component');

  useEffect(() => {
    console.log('Tasks updated:', tasks);
  }, [tasks]); // Add a useEffect to log when tasks are updated

  const navigate = useNavigate();

  const handleEdit = (taskId) => {
    console.log(`Editing task with ID ${taskId}`);
    // Editing page using React Router
    navigate(`/taskEditing/${taskId}`);
  };

  const handleNewTask = () => {
    navigate('/taskCreation');
  };

  const handleDelete = (taskId) => {
    console.log(`Deleting task with ID ${taskId}`);
    // Filter out the task to be deleted
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    // Update the state with the remaining tasks
    onTaskDeleted(updatedTasks);
  };

  const handleToggleStatus = (taskId) => {
    // Call the function to toggle the status
    onTaskStatusChanged(taskId);
  };

  return (
    <div className="dashboard-component">
      <div className="top-bar">
        <h2>Task Listing</h2>
        <button onClick={handleNewTask} className="create-task-btn">
          Create New Task
        </button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.status ? task.status.toLowerCase().replace(" ", "") : ''}`}>
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>
            </div>
            <div className="task-actions">
              <button className='create-task-btns' onClick={() => handleEdit(task.id)}>
                Edit
              </button>
              <button className='create-task-btns' onClick={() => handleDelete(task.id)}>
                Delete
              </button>
              <h3>Status</h3>
              <label>:</label>
              <div className={`status-indicator ${task.status ? task.status.toLowerCase().replace(" ", "") : ''}`} onClick={() => handleToggleStatus(task.id)}></div>
              {console.log('Rendering task:', task)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListing;
