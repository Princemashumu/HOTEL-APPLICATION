import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box } from '@mui/material';
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
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms'; // Using SmokingRoomsIcon for both smoking and non-smoking

const RoomDetailsDialog = ({ open, onClose, room }) => {
  if (!room) return null; // Ensure room is not null

  // Mapping of amenities to MUI icons
  const amenitiesIcons = {
    wifi: <WifiIcon />,
    ac: <AcUnitIcon />,
    tv: <TvIcon />,
    pool: <PoolIcon />,
    restaurant: <RestaurantIcon />,
    parking: <LocalParkingIcon />,
    gym: <FitnessCenterIcon />,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
    >
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
        {/* Room Details Section */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            Room Details
          </Typography>
            <img
              src={room.image}
              alt={room.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
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

        {/* Room Amenities Section */}
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, mb: 2,width:'50%' }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'flex-start', fontWeight: 'bold' }}>
            Room Amenities
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
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
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2,width:'50%'}}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'flex-start', fontWeight: 'bold' }}>
            Room Info
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const getRatingStars = (rating) => {
  return Array(5).fill(0).map((_, index) => (
    index < rating ? <StarIcon key={index} sx={{ color: 'gold' }} /> : <StarBorderIcon key={index} sx={{ color: 'gold' }} />
  ));
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Available':
      return 'green';
    case 'Great':
      return 'blue';
    case 'Good':
      return 'orange';
    case 'Not Available':
      return 'red';
    case 'Renovating':
      return 'gray';
    default:
      return 'black';
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default RoomDetailsDialog;
