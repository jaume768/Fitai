import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './css/CartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const requests = cartItems.map((item) => api.get(`/products/${item.producto}`));
                const responses = await Promise.all(requests);
                setProducts(responses.map((res) => res.data));
            } catch (error) {
                console.error('Error al obtener productos del carrito:', error);
            }
        };

        if (cartItems.length > 0) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [cartItems]);

    const handleRemove = (id) => {
        removeFromCart(id);
        toast.info('Producto eliminado del carrito');
    };

    const handleClear = () => {
        clearCart();
        toast.info('Carrito vacío');
    };

    const total = products.reduce(
        (acc, product, index) => acc + product.precio * cartItems[index].cantidad,
        0
    );

    return (
        <div className="cart-page">
            <h1>Tu Carrito</h1>
            {products.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{product.nombre}</td>
                                    <td>${product.precio}</td>
                                    <td>{cartItems[index].cantidad}</td>
                                    <td>${product.precio * cartItems[index].cantidad}</td>
                                    <td>
                                        <button onClick={() => handleRemove(product._id)} className="btn-remove">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <h2>Total: ${total.toFixed(2)}</h2>
                        <button onClick={handleClear} className="btn-clear">
                            Vaciar Carrito
                        </button>
                        {/* Aquí puedes agregar un botón para proceder al pago */}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
