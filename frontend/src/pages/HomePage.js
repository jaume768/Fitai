// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import './HomePage.css'; // Asegúrate de crear este archivo para estilos

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener productos desde el backend
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="homepage">
            <HeroSection />
            <h2 className="featured-title">Productos Destacados</h2>
            <div className="homepage__products">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
