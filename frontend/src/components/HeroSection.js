import React from 'react';
import './HeroSection.css'; // Crea este archivo para estilos
import heroImage from '../assets/images/hero.png'; // Ajusta el nombre del archivo según corresponda
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="hero-container" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-content">
                <h1>NEW STUFF JUST DROPPED</h1>
                <p>Grab a new fit, go gym, make progress easy.</p>
                <div className="hero-buttons">
                    <Link to="/category/women" className="btn btn-women">
                        <b>SHOP WOMEN</b>
                    </Link>
                    <Link to="/category/men" className="btn btn-men">
                        <b>SHOP MEN</b>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
