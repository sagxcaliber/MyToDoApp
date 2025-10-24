import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoApi } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await todoApi.getTodos();
      setTodos(todosData);
    } catch (err) {
      setError('Failed to load todos. Please check if the backend is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await todoApi.createTodo(newTodo);
      setTodos(prevTodos => [createdTodo, ...prevTodos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
      throw err;
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Todo App</h1>
        <p>Stay organized and get things done!</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={loadTodos} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        <TodoForm onAddTodo={handleAddTodo} />
        
        <TodoList
          todos={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </main>

      <footer className="app-footer">
        <p>Total: {todos.length} todos | 
           Completed: {todos.filter(t => t.completed).length} | 
           Pending: {todos.filter(t => !t.completed).length}
        </p>
      </footer>
    </div>
  );
}

export default App;
