import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Grid, Box, Divider, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import ShowerIcon from '@mui/icons-material/Shower';
import BathtubIcon from '@mui/icons-material/Bathtub';

const InfoDialog = ({ open, handleClose }) => {
  const infoItems = [
    { icon: <AccessTimeIcon />, label: 'Check-in:', detail: '3:00 PM' },
    { icon: <AccessTimeIcon />, label: 'Check-out:', detail: '10:00 AM' },
    { icon: <PetsIcon />, label: 'Pet Policy:', detail: 'Pets not allowed' },
    { icon: <SmokingRoomsIcon />, label: 'Smoking Policy:', detail: 'Smoking areas available' },
    { icon: <ShowerIcon />, label: 'Shower:', detail: 'Available in all rooms' },
    { icon: <BathtubIcon />, label: 'Bathtub:', detail: 'Available in select rooms' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
        Hotel Information
      </DialogTitle>

      <DialogContent>
        <Divider sx={{ mb: 3, borderColor: 'gray' }} />

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {infoItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                  color: 'black',
                }}
              >
                <Box sx={{ marginRight: '10px' }}>{item.icon}</Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {item.label} <span style={{ fontWeight: 'normal' }}>{item.detail}</span>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" sx={{ marginTop: '30px' }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ padding: '10px 20px', fontWeight: 'bold' }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
