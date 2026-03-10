import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../service/apiService';
import '../styles/login.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

const handleRegister = async () => {
    if (!name || !email || !password) {
        alert('All fields required');
        return;
    }

    const data = await registerUser({ name, email, password });

    if ( data.message === 'User registered successfully') {
        alert('Registration successful');
        navigate('/');
    } else {
        alert(data.message);
    }
};

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    );
}

export default Register;