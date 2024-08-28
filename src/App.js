// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; 
import BookingPage from './pages/BookingPage';
import RoomsPage from './pages/RoomsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
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
