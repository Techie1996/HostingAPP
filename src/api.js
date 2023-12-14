export const handleUpdate = async (taskId, updatedTaskData) => {
  try {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PUT', // or 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTaskData),
    });

    if (response.ok) {
      console.log('Task updated successfully');
      // Handle any additional client-side updates if needed

      // Optionally, you may want to refresh the tasks list after updating
      // For example, refetch the tasks or update the state based on the response
    } else {
      console.error('Failed to update task:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
