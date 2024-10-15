import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import './css/Navbar.css';
import { ReactComponent as Icon } from '../assets/images/icon.svg';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };

    const closeMobileMenu = () => {
        setIsMobile(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
                    <Icon className="navbar__icon" />
                </Link>
            </div>

            <div className={`navbar__center ${isMobile ? 'navbar__center--active' : ''}`}>
                <Link to="/" className="navbar__category" onClick={closeMobileMenu}>
                    Inicio
                </Link>
                <Link to="/category/women" className="navbar__category" onClick={closeMobileMenu}>
                    Women
                </Link>
                <Link to="/category/men" className="navbar__category" onClick={closeMobileMenu}>
                    Men
                </Link>
                <Link to="/cart" className="navbar__category" onClick={closeMobileMenu}>
                    <FaShoppingCart /> Carrito
                </Link>
                <Link to="/login" className="navbar__category" onClick={closeMobileMenu}>
                    Iniciar Sesión
                </Link>
            </div>

            <ul className="navbar__right">
            </ul>

            <div className="navbar__mobile-icon" onClick={handleToggle}>
                {isMobile ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;
