import React from 'react';
import '../RegisterPage/RegisterPage.css'; // Assuming you have a CSS file
import banner from "../RegisterPage/bannerImageS.jpg";
import Header from 'C:/Users/User/Documents/Code Tribe/ACADEMY/hotelapp/src/Components/Header/Header';
import Signup from "C:/Users/User/Documents/Code Tribe/ACADEMY/hotelapp/src/Components/signup/Signup";
import Footer from "C:/Users/User/Documents/Code Tribe/ACADEMY/hotelapp/src/Components/Footer/Footer";

function RegisterPage() {
  return (
    <div className="register-page">
      <Header />
      <div className="Banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>
              <span style={{ color: 'white' }}>Tzaneen</span>
              <span style={{ color: 'red' }}>Hotels.</span>
            </h1>
          </div>
          
        </div>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
