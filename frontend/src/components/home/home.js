import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const categories = [
  { name: 'dogProducts', displayName: 'Dog Products', imgSrc: 'dogProducts.webp' },
  { name: 'catProducts', displayName: 'Cat Products', imgSrc: 'catProducts.webp' },
  { name: 'fishProducts', displayName: 'Fish Products', imgSrc: 'fishProducts.webp' },
  { name: 'generalPetSupplies', displayName: 'General Pet Supplies', imgSrc: 'generalPetSupplies.webp' },
  { name: 'petHealthAndWellness', displayName: 'Pet Health and Wellness', imgSrc: 'petHealthAndWellness.webp' },
  { name: 'petAccessories', displayName: 'Pet Accessories', imgSrc: 'petAccessories.webp' },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="categories">
        <h2>Categories</h2>
        <div className="category-grid">
          {categories.map(category => (
            <Link to={`/category/${category.name}`} key={category.name} className="category-card">
              <img src={category.imgSrc} alt={category.displayName} />
              <h3>{category.displayName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
