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
import SignUpNotificationDialog from './SignUpNotificationDialog'; // Import the new component
import { GridLoader } from 'react-spinners'; // Import the loader

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

  const handleSaveRoom = () => {
    // Implement save room logic here
    console.log('Room saved');
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
                    startAdornment: <InputAdornment position="start">👤</InputAdornment>,
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {loading ? (
                    <GridLoader
                      color="#007bff"
                      loading={loading}
                      size={15}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: '8px', padding: '10px 16px' }}
                      onClick={handleReserveNow}
                    >
                      Reserve Now
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FavoriteIcon />}
                    sx={{ borderRadius: '8px', padding: '10px 16px' }}
                    onClick={handleSaveRoom}
                  >
                    Save Room
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render the SignUpNotificationDialog when showSignUpDialog is true */}
      <SignUpNotificationDialog
        open={showSignUpDialog}
        onClose={() => setShowSignUpDialog(false)}
      />
    </>
  );
};

// Utility functions to handle dynamic data
const getRatingStars = (rating) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarIcon key={index} sx={{ color: 'gold' }} /> : <StarBorderIcon key={index} sx={{ color: 'gold' }} />
      )}
    </Box>
  );
};

const getStatusColor = (status) => {
  if (status === 'Available') return 'green';
  if (status === 'Booked') return 'red';
  return 'gray';
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default RoomDetailsDialog;
