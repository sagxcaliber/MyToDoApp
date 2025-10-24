import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Todo type definition (JavaScript doesn't have interfaces, but we'll use JSDoc for type hints)
/**
 * @typedef {Object} Todo
 * @property {number} [id] - Todo ID
 * @property {string} title - Todo title
 * @property {string} [description] - Todo description
 * @property {boolean} completed - Completion status
 * @property {string} [created_at] - Creation timestamp
 */

export const todoApi = {
  // Get all todos
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get a single todo by ID
  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, todo) => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await api.delete(`/todos/${id}`);
  },

  // Toggle todo completion status
  toggleTodo: async (id, completed) => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  },
};

export default api;
