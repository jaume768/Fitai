import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext();

// Definir acciones
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const exists = state.find(item => item.producto === action.payload.producto._id);
            if (exists) {
                return state.map(item =>
                    item.producto === action.payload.producto._id
                        ? { ...item, cantidad: item.cantidad + action.payload.cantidad }
                        : item
                );
            } else {
                return [...state, { producto: action.payload.producto._id, cantidad: action.payload.cantidad }];
            }
        case REMOVE_FROM_CART:
            return state.filter(item => item.producto !== action.payload);
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (producto, cantidad) => {
        dispatch({ type: ADD_TO_CART, payload: { producto, cantidad } });
    };

    const removeFromCart = (productoId) => {
        dispatch({ type: REMOVE_FROM_CART, payload: productoId });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return (
        <CartContext.Provider value={{ cartItems: cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto
export const useCart = () => {
    return useContext(CartContext);
};
