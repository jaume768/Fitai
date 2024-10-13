import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import './css/CategoryPage.css';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener productos por categoría desde el backend
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products/category/${category}`);
                setProducts(res.data);
            } catch (error) {
                console.error('Error al obtener productos por categoría:', error);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="category-page">
            <h2 className="category-title">Categoría: {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="category__products">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
