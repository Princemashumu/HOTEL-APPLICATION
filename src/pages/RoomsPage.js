import React from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Grid, Box,Divider} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function RoomsPage() {
  // Example data for the cards
  const rooms = [
    { id: 1, name: 'Suite', image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Deluxe Room', image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Standard Room', image: 'https://via.placeholder.com/200' },
  ];

  return (
    <Container sx={{ backgroundColor: "beige", borderRadius: '25px', height:"350px"}}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ marginBottom: '30px', fontWeight: 'bold' }}>
        Rooms & Suites
      </Typography>
      <Divider sx={{ marginBottom: '20px', borderColor: 'gray' }} />
      <Grid container spacing={4} justifyContent="center">
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardMedia
                component="img"
                alt={room.name}
                height="140"
                image={room.image}
              />
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" sx={{ marginRight: '8px' }}>
                    {room.name}
                  </Typography>
                  <ArrowForwardIcon />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RoomsPage;
