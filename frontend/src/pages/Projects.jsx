import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {createTask , fetchTasks , updateTaskStatus} from '../service/apiService';
import '../styles/projects.css';

function Projects() {
    const { projectid } = useParams(); 
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        loadAllTasks();
    }, []);

    const loadAllTasks = async () => {
          const data = await fetchTasks();
          setTasks(data);
    }

    const handleCreateTask = async () => {
        await createTask({ title, description, projectid });
        const data = await fetchTasks();
        setTasks(data);
    };

    const handleStatusChange = async (taskId, status) => {
        await updateTaskStatus(taskId, status);
        const data = await fetchTasks();
        setTasks(data);
    };

    return (
        <div className="project-container">
            <h2>Project Tasks</h2>
            <div className="create-task">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleCreateTask}>Add Task</button>
            </div>
            <h3>Tasks</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <select value={task.status} onChange={(e) => handleStatusChange(task._id, e.target.value)}>
                                    <option value="todo">Todo</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Projects;