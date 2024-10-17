// src/pages/admin/AdminUsers.js
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../css/AdminProducts.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            toast.error('Error al obtener usuarios');
            setLoading(false);
        }
    };

    const handleUpdateRole = async (id, role) => {
        try {
            await api.put(`/admin/users/${id}/role`, { role });
            toast.success('Rol de usuario actualizado');
            fetchUsers();
        } catch (error) {
            console.error('Error al actualizar rol:', error);
            toast.error('Error al actualizar rol');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                toast.success('Usuario eliminado');
                fetchUsers();
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                toast.error('Error al eliminar usuario');
            }
        }
    };

    return (
        <div className="admin-users">
            <h2>Gestión de Usuarios</h2>
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre de Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role !== 'admin' ? (
                                        <button onClick={() => handleUpdateRole(user._id, 'admin')}>Promover a Admin</button>
                                    ) : (
                                        <button onClick={() => handleUpdateRole(user._id, 'user')}>Demover a Usuario</button>
                                    )}
                                    <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminUsers;
