// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css'; // Asegúrate de crear este archivo para estilos
import { ReactComponent as Icon } from '../assets/images/icon.svg'; // Importar el SVG como componente

const Navbar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            {/* Parte Izquierda: Icono SVG */}
            <div className="navbar__left">
                <Link to="/">
                    <Icon className="navbar__icon" aria-label="DeportesStore Logo" />
                </Link>
            </div>

            {/* Parte Central: Enlaces "WOMEN'S" y "MEN'S" */}
            <div className="navbar__center">
                <Link to="/category/women" className="navbar__category">
                    WOMEN'S
                </Link>
                <Link to="/category/men" className="navbar__category">
                    MEN'S
                </Link>
            </div>

            {/* Parte Derecha: Enlaces Actuales */}
            <ul className="navbar__right">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/cart">
                        <FaShoppingCart /> Carrito
                    </Link>
                </li>
                {userInfo.token ? (
                    <>
                        <li>
                            <span>Hola, {userInfo.username}</span>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="btn-logout">
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">
                            <FaUser /> Iniciar Sesión
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
