import React, { useEffect, useState } from 'react';
import './RegisterPage.css'; // Assuming you have some CSS for styling
import logoImg from './Logo.png'; // Adjust the path as needed

const RegisterPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logoImg} alt="HotelApp Logo" className="logo-img" />
      </div>
     
    </header>
  );
};

export default RegisterPage;
