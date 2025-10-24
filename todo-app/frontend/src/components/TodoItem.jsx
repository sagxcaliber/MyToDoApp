import React, { useState } from 'react';
import { Check, Edit2, Trash2, Save, X } from 'lucide-react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = async () => {
    try {
      await onUpdateTodo(todo.id, { completed: !todo.completed });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    try {
      await onUpdateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await onDeleteTodo(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className={`complete-btn ${todo.completed ? 'completed' : ''}`}
          onClick={handleToggleComplete}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check size={16} />}
        </button>

        <div className="todo-text">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-title-input"
                placeholder="Todo title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-description-input"
                placeholder="Description (optional)"
                rows="2"
              />
              <div className="edit-actions">
                <button onClick={handleCancel} className="cancel-edit-btn">
                  <X size={14} />
                </button>
                <button onClick={handleSave} className="save-edit-btn">
                  <Save size={14} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="todo-title">{todo.title}</h3>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <span className="todo-date">
                Created: {formatDate(todo.created_at)}
              </span>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="todo-actions">
            <button onClick={handleEdit} className="edit-btn" aria-label="Edit todo">
              <Edit2 size={16} />
            </button>
            <button onClick={handleDelete} className="delete-btn" aria-label="Delete todo">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
