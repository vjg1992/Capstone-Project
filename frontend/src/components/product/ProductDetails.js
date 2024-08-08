import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8001/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.Images[0]} alt={product.ProductName} />
      <h1>{product.ProductName}</h1>
      <p>{product.Description}</p>
      <p><strong>Price:</strong> ${product.Price}</p>
      <p><strong>Category:</strong> {product.Category}</p>
      <p><strong>SubCategory:</strong> {product.SubCategory}</p>
      <p><strong>Brand:</strong> {product.Brand}</p>
      <p><strong>Rating:</strong> {product.Rating}</p>
    </div>
  );
};

export default ProductDetails;
