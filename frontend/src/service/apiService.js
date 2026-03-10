import axios from 'axios';

const api_url = 'https://ssignment-roject-manavjain20034260-vkluq3ry.leapcell.dev/api';

const headertoken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export  const loginUser = async (logincredentials) => {
    try {
            const response = await axios.post(`${api_url}/user/login`,  logincredentials );
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
            return null;
    }
};

export  const registerUser = async (newUserData) => {
        try {
        const response = await axios.post(`${api_url}/user/register`,  newUserData );
            return response.data;
    } catch (error) {
            console.error('Error registering user:', error);
        return error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${api_url}/user/getusers`, headertoken());
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${api_url}/project/getProjects`, headertoken());
            return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
            return error;
    }
};

export const createProject = async (projectData) => {
    try {
            const response = await axios.post(`${api_url}/project/createProject`,  projectData , headertoken());
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        return null;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${api_url}/task/createtask`, taskData, headertoken());
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        return null;
    }
};

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${api_url}/task/gettasks`, headertoken());
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null;
    }
};

export const updateTaskStatus = async (taskId, status) => {
    try {
        const response = await axios.put(`${api_url}/task/tasks/${taskId}/status`, { status }, headertoken());
        return response.data;
    } catch (error) {
        console.error('Error updating task status:', error);
        return null;
    }
};

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
};