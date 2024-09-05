import React, { useEffect, useState } from 'react';
import './Header.css';
import logoImg from '../Images/Logo.png'; // Adjust the path as needed
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoggedIn = false;

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

  const handleBookNowClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      window.location.href = '/book-now';
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Slide transition for the dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
      <div className="book-now">
        <a href="/book-now" className="book-now-button" onClick={handleBookNowClick}>Book Now</a>
      </div>

      {/* Dialog for sign up/sign in notification */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition} // Apply the slide transition
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: '25px', // Set border radius
            transform: 'scale(1.1)', // Apply transformation
            transition: 'transform 0.1s ease-in-out' // Animation transition for transform
          }
        }}
      >
        <DialogTitle>Sign Up or Sign In Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to sign up or sign in to Book Now.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.href = '/registerpage'} color="primary">
            Sign Up
          </Button>
          <Button onClick={() => window.location.href = '/loginpage'} color="primary" autoFocus>
            Sign In
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;
