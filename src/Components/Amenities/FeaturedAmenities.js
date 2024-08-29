import React from 'react';
import { Container, Grid, Typography, Box, Divider } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SpaIcon from '@mui/icons-material/Spa';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ShowerIcon from '@mui/icons-material/Shower';
import BathtubIcon from '@mui/icons-material/Bathtub';

function FeaturedAmenities() {
  const amenities = [
    { icon: <WifiIcon fontSize="large" />, name: 'Free Wi-Fi' },
    { icon: <PoolIcon fontSize="large" />, name: 'Swimming Pool' },
    { icon: <FitnessCenterIcon fontSize="large" />, name: 'Fitness Center' },
    { icon: <LocalDiningIcon fontSize="large" />, name: 'Restaurant' },
    { icon: <SpaIcon fontSize="large" />, name: 'Spa' },
    { icon: <LocalParkingIcon fontSize="large" />, name: 'Free Parking' },
    { icon: <ShowerIcon fontSize="large" />, name: 'Shower' },
    { icon: <BathtubIcon fontSize="large" />, name: 'Bathtub' },
  ];

  return (
    <Container sx={{ backgroundColor: 'beige', borderRadius: '15px', padding: '20px', marginTop: '30px' }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Featured Amenities
      </Typography>
      <Divider sx={{ marginBottom: '20px', borderColor: 'gray' }} />
      <Grid container spacing={4} justifyContent="center">
        {amenities.map((amenity, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {amenity.icon}
              <Typography variant="h6" component="p" sx={{ marginTop: '10px' }}>
                {amenity.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FeaturedAmenities;
