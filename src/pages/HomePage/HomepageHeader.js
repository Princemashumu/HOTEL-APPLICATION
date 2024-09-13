import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './HomepageHeader.css';
import logoImg from './Logo.png';
import { FaUserCircle } from 'react-icons/fa';
import ProfileDialog from './ProfileDialog';
import GalleryDialog from './GalleryDialog';
import InfoDialog from './InfoDialog';
import ContactDialog from './ContactDialog';

const HomepageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleGalleryDialogOpen = (e) => {
    e.preventDefault();
    setGalleryDialogOpen(true);
  };
  const handleGalleryDialogClose = () => setGalleryDialogOpen(false);

  const handleInfoDialogOpen = (e) => {
    e.preventDefault();
    setInfoDialogOpen(true);
  };
  const handleInfoDialogClose = () => setInfoDialogOpen(false);

  const handleContactDialogOpen = (e) => {
    e.preventDefault();
    setContactDialogOpen(true);
  };
  const handleContactDialogClose = () => setContactDialogOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logoImg} alt="HotelApp Logo" className="logo-img" />
      </div>
      <nav className="nav">
        <ul>
          <li className={isActive('/homepage') ? 'active' : ''}>
            <a href="/homepage">Home</a>
          </li>
          <li>
            <a href="/" onClick={handleInfoDialogOpen}>Info</a>
          </li>
          <li>
            <a href="/" onClick={handleGalleryDialogOpen}>Gallery</a>
          </li>
          <li>
            <a href="/" onClick={handleContactDialogOpen}>Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="profile-icon" onClick={handleDialogOpen} aria-label="Profile" style={{ cursor: 'pointer' }}>
        <FaUserCircle size={30} color="#fff" />
      </div>

      {/* Dialog Components */}
      <ProfileDialog open={dialogOpen} handleClose={handleDialogClose} />
      <GalleryDialog open={galleryDialogOpen} handleClose={handleGalleryDialogClose} />
      <InfoDialog open={infoDialogOpen} handleClose={handleInfoDialogClose} />
      <ContactDialog open={contactDialogOpen} handleClose={handleContactDialogClose} />
    </header>
  );
};

export default HomepageHeader;
