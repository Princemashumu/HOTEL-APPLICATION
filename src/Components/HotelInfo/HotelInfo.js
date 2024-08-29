import React from 'react';
import { Container, Typography, Grid, Box, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PetsIcon from '@mui/icons-material/Pets';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import ShowerIcon from '@mui/icons-material/Shower';
import BathtubIcon from '@mui/icons-material/Bathtub';

function HotelInfo() {
  const infoItems = [
    { icon: <AccessTimeIcon />, label: 'Check-in:', detail: '3:00 PM' },
    { icon: <AccessTimeIcon />, label: 'Check-out:', detail: '10:00 AM' },
    { icon: <PetsIcon />, label: 'Pet Policy:', detail: 'Pets not allowed' },
    { icon: <SmokingRoomsIcon />, label: 'Smoking Policy:', detail: 'Smoking areas available' },
    { icon: <ShowerIcon />, label: 'Shower:', detail: 'Available in all rooms' },
    { icon: <BathtubIcon />, label: 'Bathtub:', detail: 'Available in select rooms' },
  ];

  return (
    <Container sx={{ backgroundColor: 'beige', borderRadius: '15px', padding: '20px', marginTop: '30px' }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Hotel Information
      </Typography>
      <Divider sx={{ marginBottom: '20px', borderColor: 'gray' }} />
      <Grid container spacing={3} justifyContent="center" direction="row" wrap="wrap">
        {infoItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box display="flex" alignItems="center">
              {item.icon}
              <Typography variant="body1" component="p" sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
                {item.label} <span style={{ fontWeight: 'normal' }}>{item.detail}</span>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HotelInfo;
