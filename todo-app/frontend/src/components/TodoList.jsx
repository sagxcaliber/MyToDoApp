import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos yet</h3>
        <p>Add your first todo to get started!</p>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todo-list">
      {pendingTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            Pending ({pendingTodos.length})
          </h2>
          <div className="todos">
            {pendingTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            Completed ({completedTodos.length})
          </h2>
          <div className="todos">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onDeleteTodo={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
