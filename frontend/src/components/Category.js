import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${name}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, [name]);

  const renderProduct = (product) => {
    switch (name) {
      case 'books':
        return (
          <div key={product.ProductID} className="product-card">
            <img src={product.Images[0]} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>{product.Author.join(', ')}</p>
            <p>{product.Description}</p>
            <p>${product.Price}</p>
          </div>
        );
      case 'electronics':
        return (
          <div key={product.ProductID} className="product-card">
            <img src={product.Images[0]} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>{product.Specifications.processor}</p>
            <p>{product.Description}</p>
            <p>${product.Price}</p>
          </div>
        );
      case 'fashion':
        return (
          <div key={product.ProductID} className="product-card">
            <img src={product.Images[0]} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>{product.Brand}</p>
            <p>{product.Description}</p>
            <p>${product.Price}</p>
          </div>
        );
      case 'home-and-kitchen':
        return (
          <div key={product.ProductID} className="product-card">
            <img src={product.Images[0]} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>{product.Brand}</p>
            <p>{product.Description}</p>
            <p>${product.Price}</p>
          </div>
        );
      case 'sports-and-fitness':
        return (
          <div key={product.ProductID} className="product-card">
            <img src={product.Images[0]} alt={product.ProductName} />
            <h3>{product.ProductName}</h3>
            <p>{product.Brand}</p>
            <p>{product.Description}</p>
            <p>${product.Price}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="category-container">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <div className="product-grid">
        {products.map(product => renderProduct(product))}
      </div>
    </div>
  );
};

export default Category;
