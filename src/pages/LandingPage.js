import React from 'react';
import { TextField, Button } from '@mui/material';
import './LandingPage.css';
import banner from '../Images/bannerImageS.jpg';
import Header from './Header';
import RoomsPage from './RoomsPage';

function LandingPage() {
  return (
    <div>
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
            label="Number of People"
            type="number"
            className="form-input"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              borderRadius: '25px',
              fontSize: '10px',
              fontWeight: 'bold',
              textTransform: 'none',
              transition: 'background-color 0.3s, border-color 0.3s',
              '&:hover': {
                backgroundColor: 'black',
                borderColor: '#08a1dd',
              },
            }}
          >
            View Rates
          </Button>
        </form>
      </div>
      <div className="landing-content">
        {/* Optional additional content can go here */}
        
      </div>
      <RoomsPage/>
    </div>
  );
}

export default LandingPage;
