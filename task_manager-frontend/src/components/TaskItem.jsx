// taskmanager-frontend/src/components/TaskItem.js

import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: task.completed ? '#e6ffe6' : '#fff',
            textDecoration: task.completed ? 'line-through' : 'none'
        }}>
            <div style={{ flexGrow: 1 }}>
                {/* Note: If your task model has a 'description' field, you can display it here */}
                <h4>{task.title}</h4>
                <p style={{ fontSize: '12px', color: '#666' }}>ID: {task.id}</p>
            </div>

            <div style={{ minWidth: '220px', textAlign: 'right' }}>
                <button 
                    onClick={() => onToggle(task.id, task.completed)}
                    style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: task.completed ? '#ff9999' : '#99ff99' }}
                >
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button 
                    onClick={() => onDelete(task.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#ff5c5c', color: 'white' }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;