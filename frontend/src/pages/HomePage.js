import React, { useEffect, useState, useRef } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import './css/HomePage.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const res = await api.get('/products', {
                    params: { category: 'NUEVOS' } // Asegúrate de que "NUEVOS" es el nombre correcto de la categoría
                });
                setProducts(res.data);
            } catch (error) {
                console.error('Error al obtener productos de la categoría "NUEVOS":', error);
            }
        };

        fetchNewProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Número de tarjetas visibles
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    return (
        <div className="homepage">
            <HeroSection />
            <div className="homepage__header">
                <div className='title-header'>
                    <h2 className="featured-title">NEW SEASON + NEW DROPS = MORE PROGRESS</h2>
                    <Link to="/category/nuevos" className="view-all">View All</Link>
                </div>
                <div className="carousel__controls">
                    <button onClick={handlePrev} className="carousel__btn">
                        <FaChevronLeft />
                    </button>
                    <button onClick={handleNext} className="carousel__btn">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            <Slider {...settings} ref={sliderRef} className="homepage__products">
                {products.map((product) => (
                    <div key={product._id} className="product-slide">
                        <ProductCard product={product} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomePage;
