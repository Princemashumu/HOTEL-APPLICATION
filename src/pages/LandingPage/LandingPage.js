import React from 'react';
import { TextField, Button } from '@mui/material';
import './LandingPage.css';
import banner from './bannerImageS.jpg';
import Header from '../../Components/Header/Header';
import RoomsPage from './RoomsPage';
import FeaturedAmenities from '../../Components/Amenities/FeaturedAmenities';
import HotelInfo from '../../Components/HotelInfo/HotelInfo';
import Footer from '../../Components/Footer/Footer';


function LandingPage() {
  return (
    <div >

      <div className='Banner'>
        <Header/>
        <img src={banner} alt="Banner" className="banner-image" />
        <div className="banner-text">
  <h1><span style={{ color: 'white' }}>Tzaneen</span><span style={{ color: 'red' }}>Hotels.</span></h1>
  {/* <p>An ideal stay when your looking for luxury.</p> */}
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
  type="submit"
  variant="contained"
  sx={{
    background: 'linear-gradient(45deg, #000, #333)',
    color: '#fff',
    // padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s, transform 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid transparent',
    '&:hover': {
      background: 'linear-gradient(45deg, #08a1dd, #0c7db8)',
      borderColor: '#08a1dd',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-2px)',
    },
  }}
>
  View Rates
</Button>

        </form>
      </div>
      <div className="landing-content">
        {/* Optional additional content can go here */}
        <div className="Rooms-page">
        <RoomsPage/>
        </div>
        <div className="Hotel-Amenities">
          <FeaturedAmenities/>
        </div>
        <div className='Hotel-Info'>
          <HotelInfo/>
        </div>
        <div className='Footer'>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
