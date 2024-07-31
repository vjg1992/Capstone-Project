// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="main_div">
        <div className="main_logo_div">
          <div className="logo-div">
            <img className="iframe_logo" src="/ShopPlusPlus.gif" alt='ShopPlusPlus - Logo'/>
          </div>
          <div className="categories-div">
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/category/electronics">Electronics</Link>
              <Link to="/category/fashion">Fashion</Link>
              <Link to="/category/home-and-kitchen">Home and Kitchen</Link>
              <Link to="/category/sports-and-fitness">Sports and Fitness</Link>
              <Link to="/category/books">Books</Link>
            </div>
          </div>
        </div>
        <div className="side_logo">
          <img
            className="main_logo"
            src="/ShopPlusPlusLogo.webp"
            alt="Shop Smart, Shop Better"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
