import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // backend base URL

// ✅ Create a new task
export const createTask = async (taskData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// ✅ Get all tasks
export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// ✅ Search tasks by name
export const searchTasks = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching tasks:', error);
    throw error;
  }
};

// ✅ Delete task by ID
export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks`, {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// ✅ Run command for task by ID
export const runTask = async (id: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}/execute`);
    return response.data;
  } catch (error) {
    console.error('Error executing task:', error);
    throw error;
  }
};
