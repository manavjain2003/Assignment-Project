import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/apiService';
import '../styles/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
    if (!email || !password) {
        alert(' all fields requried');
        return;
    }
        const data = await loginUser({ email, password });
        if (data) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    } else {
        alert('Invalid email or password');
    }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have account? <a href="/register">Register</a></p>
        </div>
    );
}

export default Login;