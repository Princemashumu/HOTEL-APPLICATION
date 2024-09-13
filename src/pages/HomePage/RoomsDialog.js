import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Grid, Box, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import RoomDetailsDialog from './RoomDetailsDialog'; // Ensure correct path

const RoomsDialog = ({ open, handleClose }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch accommodations from Firestore when the dialog opens
  useEffect(() => {
    if (open) {
      const fetchAccommodations = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'accommodation'));
          const items = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name, // Ensure room name is included
              ...data,
              price: Number(data.price) || 0, // Ensure price is a number
            };
          });
          setAccommodations(items);
        } catch (error) {
          console.error('Error fetching accommodations:', error);
        }
      };

      fetchAccommodations();
    }
  }, [open]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseDetailsDialog = () => {
    setSelectedRoom(null);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Rooms Information</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Grid container spacing={6}> {/* Increased spacing here */}
            {accommodations.map((room) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
                <Box
                  sx={{
                    padding: '15px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRoomClick(room)}
                >
                  {/* Room Name */}
                  <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                    {room.roomName}
                  </Typography>
                  
                  {/* Room Image */}
                  {room.images && room.images.length > 0 && (
                    <Box
                      component="img"
                      src={room.images[0]}
                      alt={room.name}
                      sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', mb: 2 }}
                    />
                  )}
                  
                  {/* Room Details */}
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Price: ZAR {room.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">Rating: {room.rating} / 5</Typography>
                  <Typography variant="body1">Availability: {room.availability ? 'Available' : 'Not Available'}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Amenities: {room.amenities.join(', ')}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Button variant="contained" onClick={handleClose} sx={{ mt: 2, top:'10px' }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Room Details Dialog */}
      {selectedRoom && (
        <RoomDetailsDialog
          open={Boolean(selectedRoom)}
          onClose={handleCloseDetailsDialog}
          room={selectedRoom}
        />
      )}
    </>
  );
};

export default RoomsDialog;
