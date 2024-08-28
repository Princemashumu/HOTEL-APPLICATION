import React from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

function RoomsPage() {
  // Example data for the cards
  const rooms = [
    { id: 1, name: 'Deluxe Room', image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Suite', image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Standard Room', image: 'https://via.placeholder.com/200' },
  ];

  return (
    <Container>
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
                <Typography variant="h6">{room.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RoomsPage;
