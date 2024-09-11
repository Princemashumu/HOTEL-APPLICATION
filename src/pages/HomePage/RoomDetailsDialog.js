import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography,
  IconButton, Box, TextField, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { GridLoader } from 'react-spinners';
import { db,auth } from '../../firebase/firebaseConfig';
import ReservationDetailsDialog from './ReservationDetailsDialog';

const RoomDetailsDialog = ({ open, onClose, room }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showReservationDialog, setShowReservationDialog] = useState(false);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowReservationDialog(true);
    }, 1000);
  };

  const handleSaveRoom = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is logged in');
        return;
      }
      const userId = user.uid; // Get the logged-in user's ID
      await db.collection('favorites').doc(userId).collection('rooms').doc(room.id).set({
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
                    <Typography variant="body1">Check-In: 03:00 PM</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ color: 'grey', mr: 1 }} />
                    <Typography variant="body1">Check-Out: 10:00 AM</Typography>
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
                    {loading ? <GridLoader size={10} color="#ffffff" /> : 'Save Room'}
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

      {/* Reservation Details Dialog */}
      <ReservationDetailsDialog
        open={showReservationDialog}
        onClose={() => setShowReservationDialog(false)}
        room={room}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        price={room.price}
      />
    </>
  );
};

export default RoomDetailsDialog;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRatingStars(rating) {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
}

function getStatusColor(status) {
  switch (status) {
    case 'Available':
      return 'green';
    case 'Booked':
      return 'red';
    default:
      return 'gray';
  }
}
