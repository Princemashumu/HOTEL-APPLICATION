import React from 'react';
import Header from './Header';
import './LandingPage.css'; // Optional: Add your styles for LandingPage here
import banner from '../Images/bannerImage.jpg'; // Import the banner image

function LandingPage() {
  return (
    <div>
      <div 
        className='Banner' 
        style={{ 
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',  // Ensure the image covers the entire div
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
            height: '500px', // Adjust height as needed
            width: '100%', // Full width of the container
          }}
      >
        <Header />
        
        <form className="booking-form">
          <input type="date" placeholder="Check-in Date" className="form-input" />
          <input type="date" placeholder="Check-out Date" className="form-input" />
          <input type="number" placeholder="Number of People" className="form-input" />
          <button type="submit" className="form-button">Book Now</button>
        </form>
      </div>
      
      <div className="landing-content">
        <h1>Welcome to HotelApp</h1>
        <p>Your ideal hotel booking platform.</p>
      </div>
    </div>
  );
}

export default LandingPage;
