import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import api from '../api/axios.js';
import TaskItem from '../components/TaskItem.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TasksPage = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completedToday, setCompletedToday] = useState(0);

    const fetchTasks = async () => {
        try {
            const response = await api.get('tasks/');
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch tasks. Please ensure the backend is running and log in again.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                logoutUser();
            }
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const createTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            const response = await api.post('tasks/', {
                title: newTaskTitle.trim(),
                completed: false,
            });
            setTasks([response.data, ...tasks]);
            setNewTaskTitle('');
        } catch (err) {
            toast.error('⚠️ Could not create task.');
        }
    };

    const toggleTask = async (taskId, completedStatus) => {
        try {
            const response = await api.patch(`tasks/${taskId}/`, {
                completed: !completedStatus,
            });

            setTasks(tasks.map(task =>
                task.id === taskId ? response.data : task
            ));

            if (!completedStatus) {
                setCompletedToday(completedToday + 1);
                toast.success(`🎉 Task Completed: "${response.data.title}"`);
            }
        } catch (err) {
            toast.error('⚠️ Could not update task.');
        }
    };

    const editTask = async (taskId, newTitle) => {
        if (!newTitle.trim()) return;
        try {
            const response = await api.patch(`tasks/${taskId}/`, {
                title: newTitle.trim(),
            });
            setTasks(tasks.map(task =>
                task.id === taskId ? response.data : task
            ));
        } catch (err) {
            toast.error('⚠️ Could not edit task.');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`tasks/${taskId}/`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            toast.error('⚠️ Could not delete task.');
        }
    };

    if (loading) return <h1 style={{ textAlign: 'center', marginTop: '100px', color: '#64B5F6' }}>Loading Tasks...</h1>;
    if (error) return <h1 style={{ color: 'red', textAlign: 'center', marginTop: '100px' }}>{error}</h1>;

    return (
        <div className="task-dashboard-container">
            <div className="task-header">
                <h2>Task Manager | Welcome, {user.username}!</h2>
                <h4 style={{ color: "#e1e1e2ff" }}>Tasks Completed Today: {completedToday}</h4>
            </div>

            <div className="add-task-box">
                <h3 style={{ color: '#e0e0e0', marginBottom: '15px' }}>Add New Task</h3>
                <form onSubmit={createTask} className="task-input-form">
                    <input
                        type="text"
                        placeholder="Enter new task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                        className="task-input-field"
                    />
                    <button type="submit" className="add-task-button" style={{ minWidth: '80px' }}>Add</button>
                </form>
            </div>

            <h3 className="task-list-title">Your Tasks ({tasks.length})</h3>
            {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#999' }}>No tasks found. Get started above!</p>
            ) : (
                <div className="task-list">
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    ))}
                </div>
            )}

            <div className="logout-footer">
                <button onClick={logoutUser} className="logout-button">
                    Logout
                </button>
            </div>

            {/* Toast Notifications */}
            <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
    );
};

export default TasksPage;
