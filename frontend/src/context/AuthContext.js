// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
