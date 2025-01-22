import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './LandingPage.css';
import banner from './bannerImageS.jpg';
import Header from './HomepageHeader';
import RoomsPage from './RoomsPage';
import FeaturedAmenities from '../../Components/Amenities/FeaturedAmenities';
import HotelInfo from '../../Components/HotelInfo/HotelInfo';
import Footer from '../../Components/Footer/Footer';

function HomePage() {
  const [open, setOpen] = useState(false); // State to control modal visibility

  const handleOpen = () => {
    setOpen(true); // Opens the modal
  };

  const handleClose = () => {
    setOpen(false); // Closes the modal
  };

  return (
    <div>
      <div className='Banner'>
        <Header />
        <img src={banner} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1><span style={{ color: 'white' }}>Tzaneen</span><span style={{ color: 'red' }}>Hotels.</span></h1>
        </div>
        <form className="booking-form">
          <TextField
            label="Check-in"
            type="date"
            className="form-input"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Check-out"
            type="date"
            className="form-input"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Guests"
            type="number"
            className="form-input"
          />
          <Button
            type="button"
            variant="contained"
            onClick={handleOpen}
            sx={{
              background: 'linear-gradient(45deg, #000, #333)',
              color: '#fff',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #08a1dd, #0c7db8)',
              },
            }}
          >
            View Rates
          </Button>
        </form>
      </div>
      <div className="landing-content">
        <div className="Rooms-page">
          <RoomsPage />
        </div>
        <div className="Hotel-Amenities">
          <FeaturedAmenities />
        </div>
        <div className='Hotel-Info'>
          <HotelInfo />
        </div>
        <div className='Footer'>
          <Footer />
        </div>
      </div>

      {/* Modal for room rates */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Room Rates</DialogTitle>
        <DialogContent>
          {/* You can display your room rates here */}
          <p>List of available rooms and their rates...</p>
          <RoomsPage /> {/* You can use the RoomsPage component here to display the rooms */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage;
