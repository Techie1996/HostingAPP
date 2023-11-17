import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskEditing = ({ onTaskUpdated, tasks }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);

  // Initialize editedTask with default values
  const [editedTask, setEditedTask] = useState({
    title: selectedTask ? selectedTask.title : '',
    description: selectedTask ? selectedTask.description : '',
    dueDate: selectedTask ? selectedTask.dueDate : '', // You might want to set this to a default date if needed
  });

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task.id === taskId);

    if (taskToEdit) {
      setSelectedTask(taskToEdit);
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
  }, [tasks, taskId]);

  // Update the editedTask when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setEditedTask(selectedTask);
    }
  }, [selectedTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Validation checks
    if (!editedTask.title.trim() || !editedTask.description.trim()) {
      toast.error('Title and description cannot be empty!');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (!editedTask.dueDate || editedTask.dueDate < currentDate) {
      toast.error('Due date cannot be blank or in the past!');
      return;
    }

    // Perform the update logic here (e.g., call onTaskUpdated with the editedTask)
    const updatedTask = {
      ...editedTask,
      title: editedTask.title.trim(),
      description: editedTask.description.trim(),
      dueDate: editedTask.dueDate,
    };

    // Call onTaskUpdated with the updated task
    onTaskUpdated(updatedTask);

    // Show a success toast notification
    toast.success('Task updated successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });

    // Navigate back to the task listing page
    navigate('/');
  };

  return (
    <div className="dashboard-component">
      <div className='top-bar'>
        <h2>Edit Task</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: "center" }}>
        <div className='task-card'>
          <form>
            <label>Title:</label>
            <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />
            
            <label>Description:</label>
            <textarea name="description" value={editedTask.description} onChange={handleInputChange}></textarea>

            <label>Due Date:</label>
            <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleInputChange} />
            <button type="button" className='create-task-btn' onClick={handleUpdate}>Update Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEditing;
