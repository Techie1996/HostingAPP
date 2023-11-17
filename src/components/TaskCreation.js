import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TaskCreation = ({ onTaskCreated }) => {
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  // Dummy data for demonstration
  //const [tasks, setTasks] = useState([
  //  { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2023-12-01', status: 'Completed' },
    // Add more tasks as needed
  //]);

  // Function to handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Function to handle task creation
const handleCreateTask = () => {
  // AddIng validation logic
  if (newTask.title.trim() === '' || newTask.description.trim() === '') {
    // Shows an error toast notification for empty title or description
    toast.error('Title and description cannot be empty!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    return;
  }

  if (!newTask.dueDate) {
    // Shows an error toast notification for missing due date
    toast.error('Please provide a due date for the task!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    return;
  }

  const currentDate = new Date();
  const dueDate = new Date(newTask.dueDate + 'T23:59:59'); 
  // Setting the time to the end of the day

  if (dueDate < currentDate) {
    // Shows an error toast notification for past due date
    toast.error('Due date cannot be in the past!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    return;
  }

  // Simulates task creation
  console.log('Creating task:', newTask);

  // Calls the function from App to update tasks list
  const newTaskWithId = {
    id: uuidv4(),
    ...newTask,
    status: 'Not Completed',
  };
  onTaskCreated(newTaskWithId);

  // Resets form
  setNewTask({
    title: '',
    description: '',
    dueDate: '',
  });

  // Showss a success toast notification
  toast.success('Task created successfully!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });

  // Navigates to Task Listing after creating the task
  navigate('/');
};



  return (
    <div className="dashboard-component">
      <div className='top-bar'>
        <h2>Create New Task</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: "center" }}>
        <div className='task-card' >
          <form>
            <label>Title:</label>
            <input type="text" name="title" value={newTask.title} onChange={handleInputChange} />

            <label>Description:</label>
            <textarea name="description" value={newTask.description} onChange={handleInputChange}></textarea>

            <label>Due Date:</label>
            <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange} />

            <button type="button" className='create-task-btn' onClick={handleCreateTask}>Create Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskCreation;
