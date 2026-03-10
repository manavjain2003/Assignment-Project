import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, createProject, fetchUsers , getUserRole } from '../service/apiService';
import '../styles/dashboard.css';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
    loadUsers()
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  const user = getCurrentUser();

  const handleUserSelect = (e) => {
    const selected = [];
    for(let i = 0; i < e.target.selectedOptions.length; i++){
        selected.push(e.target.selectedOptions[i].value);
    }
    setSelectedUsers(selected);
}

  const handleCreateProject = async () => {
    if (!projectName) {
      alert('Please enter a project name');
      return;
    }
    const data = await createProject({ projectName, users: selectedUsers });

    if (data) {
      alert(data.message);
      setProjectName('');
      const projects = await fetchProjects();
      setProjects(projects);
    }
  };

  
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="create-project">
        <input type="text" placeholder="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
 {user?.role === 'admin' ? (
<select multiple value={selectedUsers} onChange={handleUserSelect}>
    {users.map(user => (
        <option key={user._id} value={user._id}>{user.name}</option>
    ))}
</select>
) : null}
<p className='hint-help'>Drag in users dropdown to select mutliple</p>
    {user?.role === 'admin' ? (
  <button onClick={handleCreateProject}>Create Project</button>
) : null}
      </div>
      <h3>Projects</h3>
       <ul>
       {projects.map((project) => (
        <li key={project._id} onClick={() => navigate(`/project/${project._id}`)}>
            {project.projectName} — {project.users.map(u => u.name).join(', ')}
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;