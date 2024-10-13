import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/RegisterPage.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { username, email, password });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            toast.success('Registro exitoso');
            navigate('/');
        } catch (error) {
            console.error('Error al registrarse:', error);
            toast.error(error.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div className="register-page">
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <label>Nombre de Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">
                    Registrarse
                </button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
