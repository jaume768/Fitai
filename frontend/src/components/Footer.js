import React from 'react';
import './Footer.css'; // Crea este archivo para estilos

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} DeportesStore. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
