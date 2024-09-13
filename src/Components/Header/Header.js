import React, { useEffect, useState } from 'react';
import './Header.css';
import logoImg from '../Images/Logo.png'; // Adjust the path as needed
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';
import GalleryDialog from './GalleryDialog';
import InfoDialog from './InfoDialog';
import ContactDialog from './ContactDialog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  // Slide transition for the dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logoImg} alt="HotelApp Logo" className="logo-img" />
      </div>
      <nav className="nav">
      <ul style={{
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '20px', // Adjust the gap as needed
    justifyContent: 'center', // Center the ul horizontally
    marginLeft: '100px', // Adjust the margin-left as needed
    flexGrow: 1 // Allow ul to grow and take available space
}}>
    <li><a href="/gallerypage" onClick={handleGalleryDialogOpen}>Gallery</a></li>
    <li><a href="/info" onClick={handleInfoDialogOpen}>Info</a></li>
    <li><a href="/contact" onClick={handleContactDialogOpen}>Contact Us</a></li>
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

      {/* Dialog Components */}
      <GalleryDialog open={galleryDialogOpen} handleClose={handleGalleryDialogClose} />
      <InfoDialog open={infoDialogOpen} handleClose={handleInfoDialogClose} />
      <ContactDialog open={contactDialogOpen} handleClose={handleContactDialogClose} />
    </header>
  );
};

export default Header;
