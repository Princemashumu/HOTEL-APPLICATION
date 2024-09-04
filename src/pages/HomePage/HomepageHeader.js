import React, { useEffect, useState } from 'react';
import './HomepageHeader.css';
import logoImg from './Logo.png'; // Adjust the path as needed
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons
import ProfileDialog from './ProfileDialog'; // Import the ProfileDialog component

const HomepageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
          <li><a href="/info">Info</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>
      {/* Profile Icon triggers dialog */}
      <div className="profile-icon" onClick={handleDialogOpen} style={{ cursor: 'pointer' }}>
        <FaUserCircle size={30} color="#fff" />
      </div>

      {/* Profile Dialog */}
      <ProfileDialog open={dialogOpen} handleClose={handleDialogClose} />
    </header>
  );
};

export default HomepageHeader;
