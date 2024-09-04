
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'; 
import BookingPage from './pages/BookingPage/BookingPage';
import RoomsPage from './pages/LandingPage/RoomsPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Loader from './Components/Loader'; // Import the Loader component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Router>
      {loading && <Loader />} {/* Show loader while loading */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage/>} />
        <Route path="/registerpage" element={<RegisterPage/>} />
        <Route path="/loginpage" element={<LoginPage/>} />
        <Route path="/gallerypage" element={<GalleryPage/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/roomspage" element={<RoomsPage/>} />
        <Route path="/bookingpage" element={<BookingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
