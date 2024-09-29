import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import { formatPrice } from '../utils/formatCurrency';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>{error}</div>;
  }

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ position: 'relative', height: '400px' }}>
        {products.map((product, index) => (
          <div
            key={product._id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.name}</h2>
              <p style={{ fontSize: '1.125rem' }}>{formatPrice(product.price)}</p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ marginRight: '0.25rem' }}>★</span>
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <Link
                to={`/product/${product._id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: '#3490dc',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.5)',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.5)',
          border: 'none',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default ProductCarousel;