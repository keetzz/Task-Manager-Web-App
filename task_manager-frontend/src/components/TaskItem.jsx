import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const taskStyle = {
        border: '1px solid #4a4d52',
        padding: '15px',
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '5px',
        backgroundColor: task.completed ? '#3f513f' : '#4a4d52',
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? '#a0ffa0' : '#e0e0e0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    };

    const handleSave = () => {
        if (editTitle.trim() === task.title || !editTitle.trim()) {
            if (!editTitle.trim()) setEditTitle(task.title);
            setIsEditing(false);
            return;
        }
        onEdit(task.id, editTitle);
        setIsEditing(false);
    };

    // 🎉 Handle Complete with Confetti
    const handleComplete = () => {
        onToggle(task.id, task.completed);

        if (!task.completed) {
            confetti({
                particleCount: 80,
                spread: 120,
                origin: { y: 0.6 },
            });
        }
    };

    // Title Display Area 
    const taskTitleArea = isEditing ? (
        <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSave();
                } else if (e.key === 'Escape') {
                    setEditTitle(task.title);
                    setIsEditing(false);
                }
            }}
            style={{
                padding: '5px',
                fontSize: '1.1rem',
                backgroundColor: '#36393f',
                color: '#e0e0e0',
                border: '1px solid #4CAF50',
                borderRadius: '3px'
            }}
            autoFocus
        />
    ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h4 style={{
                margin: 0,
                fontSize: '1.1rem',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#a0ffa0' :'#e0e0e0', 
                transition: 'all 0.3s ease'
            }}>
                {task.title}
            </h4>
            <button
                onClick={() => setIsEditing(true)}
                title="Edit task"
                style={{
                    backgroundColor: 'transparent',
                    color: '#64B5F6',
                    padding: '5px',
                    fontSize: '1.1rem',
                    border: '1px solid #64B5F6',
                    borderRadius: '5px',
                    lineHeight: '1',
                    cursor: 'pointer'
                }}
            >
                ✎
            </button>
        </div>
    );
    {task.completed && (
  <span 
    style={{ 
      marginLeft: '8px',
      padding: '2px 6px',
      borderRadius: '4px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      fontSize: '0.7rem',
      fontWeight: 'bold'
    }}
  >
    DONE
  </span>
)}

    return (
        <div style={taskStyle}>
            <div style={{ flexGrow: 1, textAlign: 'left', minHeight: '40px' }}>
                {taskTitleArea}
            </div>

            <div style={{ minWidth: '220px', textAlign: 'right' }}>
                <button
                    onClick={handleComplete}
                    style={{
                        marginRight: '10px',
                        backgroundColor: task.completed ? '#007bff' : '#4CAF50',
                        cursor: 'pointer',
                    }}
                >
                    ✔
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    style={{ backgroundColor: '#dc3545', cursor: 'pointer' }}
                >
                    ✘
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
