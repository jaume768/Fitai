import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imagen} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>${product.precio}</p>
            <Link to={`/product/${product._id}`} className="btn">
                Ver Detalles
            </Link>
        </div>
    );
};

export default ProductCard;
