import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
  IconButton, Box, TextField, InputAdornment, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GridLoader } from 'react-spinners'; // Import the loader
import SignUpNotificationDialog from './SignUpNotificationDialog'; // Import the new component
import { db } from '../../firebase/firebaseConfig'; // Adjust the path according to your setup
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

const RoomDetailsDialog = ({ open, onClose, room }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false); // State for loading
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  if (!room) return null;

  const amenitiesIcons = {
    wifi: <WifiIcon />,
    ac: <AcUnitIcon />,
    tv: <TvIcon />,
    pool: <PoolIcon />,
    restaurant: <RestaurantIcon />,
    parking: <LocalParkingIcon />,
    gym: <FitnessCenterIcon />,
  };

  const handleReserveNow = () => {
    setLoading(true); // Show the loader
    setTimeout(() => {
      setLoading(false); // Hide the loader
      setShowSignUpDialog(true); // Show the sign-up dialog
    }, 1000); // Simulate loading delay (e.g., 1 second)
  };

  const handleSaveRoom = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        // Add the room to the favorites collection
        await db.collection('favorites').doc(user.uid).collection('rooms').doc(room.id).set({
          name: room.name,
          image: room.image,
          price: room.price,
          rating: room.rating,
          status: room.status,
          amenities: room.amenities,
          checkIn: room.checkIn,
          checkOut: room.checkOut,
          smoking: room.smoking,
          reviewsCount: room.reviewsCount,
        });
        console.log('Room saved');
      } else {
        console.error('No user logged in');
      }
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogTitle>
          {room.name}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ height: 'calc(100vh - 120px)' }}>
            {/* Left Column - Room Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                  Room Details
                </Typography>
                <img
                  src={room.image}
                  alt={room.name}
                  style={{ width: '100%', height: '485px', borderRadius: '8px' }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {room.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {getRatingStars(room.rating)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Status: <span style={{ color: getStatusColor(room.status) }}>{room.status}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Price: R{room.price} per night
                  </Typography>
                  <Typography variant="body2">
                    Number of Reviews: {room.reviewsCount}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Room Amenities, Info, Reservation */}
            <Grid item xs={12} md={6}>
              {/* Room Amenities Section */}
              <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Room Amenities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {room.amenities && room.amenities.map((amenity, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: 1 }}>
                      {amenitiesIcons[amenity]} 
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {capitalizeFirstLetter(amenity)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Room Info Section */}
              <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Room Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ color: 'grey', mr: 1 }} />
                    <Typography variant="body1">Check-In: 3:00 pm  {room.checkIn}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ color: 'grey', mr: 1 }} />
                    <Typography variant="body1">Check-Out: 10:00 am {room.checkOut}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmokingRoomsIcon sx={{ color: 'grey', mr: 1 }} />
                    <Typography variant="body1">
                      Smoking: {room.smoking ? 'Allowed' : 'Not Allowed'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Room Reservation Section */}
              <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Room Reservation
                </Typography>
                <TextField
                  label="Check-In Date"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Check-Out Date"
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Number of Guests"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" onClick={handleSaveRoom}>
                    {loading ? <GridLoader size={10} color="#ffffff" /> : 'Save Room'} {/* Show loader */}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleReserveNow}>
                    Reserve Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Sign-Up Dialog */}
      <SignUpNotificationDialog open={showSignUpDialog} onClose={() => setShowSignUpDialog(false)} />
    </>
  );
};

const getRatingStars = (rating) => {
  let stars = '';
  for (let i = 0; i < Math.floor(rating); i++) stars += '★';
  for (let i = Math.floor(rating); i < 5; i++) stars += '☆';
  return stars;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Available':
      return 'green';
    case 'Booked':
      return 'red';
    default:
      return 'grey';
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default RoomDetailsDialog;
