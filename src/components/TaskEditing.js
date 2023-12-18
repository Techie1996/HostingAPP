import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskEditing = ({ onTaskUpdated, tasks }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  // Initialize selectedTask with default values
  // eslint-disable-next-line no-unused-vars
  const [selectedTask, setSelectedTask] = useState(null);

  // Initialize editedTask with default values
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task._id === taskId);

    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setEditedTask(taskToEdit); // Set editedTask initially
    } else {
      console.error(`Task with ID ${taskId} not found`);
    }
  }, [tasks, taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask), // Use editedTask instead of updatedTask
      });
console.log(response);
      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Assuming onTaskUpdated is a prop that updates the state with the edited task
      onTaskUpdated(editedTask);
      toast.success('Task updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="dashboard-component">
      <div className="top-bar">
        <h2>Edit Task</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div className="task-card">
          <form>
            <label>Title:</label>
            <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} />

            <label>Description:</label>
            <textarea name="description" value={editedTask.description} onChange={handleInputChange}></textarea>

            <label>Due Date:</label>
            <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleInputChange} />
            <button type="button" className="create-task-btn" onClick={handleUpdate}>
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEditing;
