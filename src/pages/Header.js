// src/components/Header.js
import React from 'react';
import './Header.css';
import logoImg from '../Images/Logo.png'; // Adjust the path as needed

const Header = () => {

  return (
    <header className="header" >
      <div className="logo">
        <img src={logoImg} alt="HotelApp Logo" className="logo-img" />
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/rooms">Rooms</a></li>
          <li><a href="/amenities">Amenities</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="book-now">
        <a href="/book-now" className="book-now-button">Book Now</a>
      </div>
    </header>
  );
};

export default Header;
