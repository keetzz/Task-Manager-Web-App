
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios'; 
import TaskItem from '../components/TaskItem'; 

const TasksPage = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // FETCH TASKS
    const fetchTasks = async () => {
        try {
            const response = await api.get('tasks/');
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch tasks. Please ensure the backend is running and log in again.');
            setLoading(false);
            if (err.response && err.response.status === 401) {
                logoutUser(); // Log out if token is expired
            }
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    // CREATE TASK
    const createTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const response = await api.post('tasks/', {
                title: newTaskTitle.trim(),
                // If your model requires a description, add a default here
                completed: false,
            });
            // Prepend the new task to the list (most recent first)
            setTasks([response.data, ...tasks]);
            setNewTaskTitle('');
        } catch (err) {
            console.error('Task creation failed:', err);
            setError('Could not create task. Check console for details.');
        }
    };

    //UPDATE TASK (PATCH)
    const toggleTask = async (taskId, completedStatus) => {
        try {
            // PATCH request to update the 'completed' status
            const response = await api.patch(`tasks/${taskId}/`, {
                completed: !completedStatus,
            });

            // Update local state with the modified task
            setTasks(tasks.map(task =>
                task.id === taskId ? response.data : task
            ));
        } catch (err) {
            console.error('Task update failed:', err);
            setError('Could not update task. Check console for details.');
        }
    };

    //DELETE TASK 
    const deleteTask = async (taskId) => {
    
    try {
        // DELETE request
        await api.delete(`tasks/${taskId}/`); 

        // Remove task from local state
        setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
        console.error('Task deletion failed:', err);
        setError('Could not delete task. Check console for details.');
    }
};

    if (loading) return <h1>Loading Tasks...</h1>;
    if (error) return <h1 style={{ color: 'red', textAlign: 'center' }}>{error}</h1>;

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Task Manager | Welcome, {user.username}!</h2>
                <button onClick={logoutUser} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>Logout</button>
            </div>
            
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h3>Add New Task</h3>
                <form onSubmit={createTask} style={{ display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="Enter new task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                        style={{ padding: '10px', flexGrow: 1, border: '1px solid #ddd', borderRadius: '3px' }}
                    />
                    <button type="submit" style={{ padding: '10px 15px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}>Add</button>
                </form>
            </div>

            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Your Tasks ({tasks.length})</h3>
            
            {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No tasks found. Get started above!</p>
            ) : (
                <div className="task-list">
                    {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TasksPage;