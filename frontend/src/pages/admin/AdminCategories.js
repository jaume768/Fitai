// src/pages/admin/AdminCategories.js
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../css/AdminProducts.css';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/admin/categories');
            setCategories(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            toast.error('Error al obtener categorías');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/categories', form);
            toast.success('Categoría creada exitosamente');
            fetchCategories();
            setForm({
                nombre: '',
                descripcion: '',
            });
        } catch (error) {
            console.error('Error al crear categoría:', error);
            toast.error('Error al crear categoría');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await api.delete(`/admin/categories/${id}`);
                toast.success('Categoría eliminada');
                fetchCategories();
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
                toast.error(error.response?.data?.message || 'Error al eliminar categoría');
            }
        }
    };

    const handleUpdate = async (id) => {
        // Implementar lógica para actualizar categorías (puede ser mediante un modal o redirigiendo a una página de edición)
        toast.info('Función de actualización no implementada aún');
    };

    return (
        <div className="admin-categories">
            <h2>Gestión de Categorías</h2>
            <form onSubmit={handleCreate} className="admin-category-form">
                <h3>Crear Nueva Categoría</h3>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Crear Categoría</button>
            </form>

            <div className="admin-category-list">
                <h3>Lista de Categorías</h3>
                {loading ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category._id}>
                                    <td>{category.nombre}</td>
                                    <td>{category.descripcion}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(category._id)}>Editar</button>
                                        <button onClick={() => handleDelete(category._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
