import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onAddTodo({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
      });
      
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="title-input"
            required
          />
          {isExpanded && (
            <>
              <textarea
                placeholder="Add description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
                rows="3"
              />
              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  <X size={16} />
                  Cancel
                </button>
                <button type="submit" className="add-btn">
                  <Plus size={16} />
                  Add Todo
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
