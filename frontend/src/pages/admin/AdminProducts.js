// src/pages/admin/AdminProducts.js
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import '../css/AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categorias: '',
        imagen: '',
        stock: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/admin/products');
            setProducts(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            toast.error('Error al obtener productos');
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
            const newProduct = {
                ...form,
                categorias: form.categorias.split(',').map(cat => cat.trim()), // Convertir a array
                precio: parseFloat(form.precio),
                stock: parseInt(form.stock),
            };
            await api.post('/admin/products', newProduct);
            toast.success('Producto creado exitosamente');
            fetchProducts();
            setForm({
                nombre: '',
                descripcion: '',
                precio: '',
                categorias: '',
                imagen: '',
                stock: '',
            });
        } catch (error) {
            console.error('Error al crear producto:', error);
            toast.error('Error al crear producto');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/admin/products/${id}`);
                toast.success('Producto eliminado');
                fetchProducts();
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                toast.error('Error al eliminar producto');
            }
        }
    };

    const handleUpdate = async (id) => {
        // Implementar lógica para actualizar productos (puede ser mediante un modal o redirigiendo a una página de edición)
        toast.info('Función de actualización no implementada aún');
    };

    return (
        <div className="admin-products">
            <h2>Gestión de Productos</h2>
            <form onSubmit={handleCreate} className="admin-product-form">
                <h3>Crear Nuevo Producto</h3>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="number" name="precio" value={form.precio} onChange={handleChange} required />
                </div>
                <div>
                    <label>Categorías (separadas por comas):</label>
                    <input type="text" name="categorias" value={form.categorias} onChange={handleChange} required />
                </div>
                <div>
                    <label>Imagen URL:</label>
                    <input type="text" name="imagen" value={form.imagen} onChange={handleChange} required />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
                </div>
                <button type="submit">Crear Producto</button>
            </form>

            <div className="admin-product-list">
                <h3>Lista de Productos</h3>
                {loading ? (
                    <p>Cargando productos...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Categorías</th>
                                <th>Imagen</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.nombre}</td>
                                    <td>{product.descripcion}</td>
                                    <td>${product.precio.toFixed(2)}</td>
                                    <td>{product.categorias.join(', ')}</td>
                                    <td><a href={product.imagen} target="_blank" rel="noopener noreferrer">Ver Imagen</a></td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button onClick={() => handleUpdate(product._id)}>Editar</button>
                                        <button onClick={() => handleDelete(product._id)}>Eliminar</button>
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

export default AdminProducts;
