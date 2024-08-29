import React from 'react';
import { Container, Typography, Box,Link} from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import customLocatorIcon from '../Images/Logo.png'; // Import your image

// Create a custom icon using the imported image
const customIcon = new L.Icon({
  iconUrl: customLocatorIcon, // Set the icon URL to the imported image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor position of the icon
  popupAnchor: [0, -32], // Popup anchor position
  className: 'leaflet-icon-custom', // Optional: add a custom class
});

function Footer() {
  return (
    <Box
      sx={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '20px', 
        marginTop: '30px' 
      }}
    >
      <Container>
        {/* Main container for Contact Us and Map */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '20px',
            gap:'5rem',
          }}
        >
        
          {/* Map Section */}
          <Box
            sx={{
              marginTop: '20px',
              height: '200px',
              width: '100%', // Responsive width
              maxWidth: '400px', // Ensure it doesn't exceed the container width
              borderRadius: '8px',
              overflow: 'hidden',
              '& .leaflet-container': {
                borderRadius: '8px',
              },
            }}
          >
            <MapContainer center={[-23.8467, 30.2338]} zoom={10} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[-23.8467, 30.2338]} icon={customIcon}>
                <Popup>Tzaneen Hotels, Limpopo</Popup>
              </Marker>
            </MapContainer>
          </Box>
            {/* Contact Us Section */}
            <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', // Align items to start
              textAlign: 'left', // Ensure text alignment is left
              mb: 2, // Margin bottom for spacing
              width: '100%', // Ensure the box takes full width
            }}
          >
            <Typography variant="h5" component="h2" mt={2} fontSize="1.2rem">
              Contact Us
            </Typography>
            <Box mt={1}>
              <Typography variant="body2" component="p" fontSize="0.9rem">
                Address: 123 Hotel Street, Limpopo, South Africa
              </Typography>
              <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
                Email: info@tzaneenhotels.com 
              </Typography>
              <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
              Phone: +27 123 456 789
              </Typography>
            </Box>
          </Box>

            {/*Terms and conditions */}

            <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', // Align items to start
              textAlign: 'left', // Ensure text alignment is left
              mb: 2, // Margin bottom for spacing
              width: '100%', // Ensure the box takes full width
            }}
          >
            <Typography variant="h5" component="h2" mt={2} fontSize="1.2rem">
              Terms & Conditions.
            </Typography>
            <Box mt={1}>
      <Typography variant="body2" component="p" fontSize="0.9rem">
        <Link href="/privacy-policy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
      <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
        <Link href="/cancellation-policy" color="inherit" underline="hover">
          Cancellation Policy
        </Link>
      </Typography>
      <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
        <Link href="/booking-policy" color="inherit" underline="hover">
          Booking Policy
        </Link>
      </Typography>
      <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
        <Link href="/accessibility-policy" color="inherit" underline="hover">
          Accessibility Policy
        </Link>
      </Typography>
      <Typography variant="body2" component="p" mt={1} fontSize="0.9rem">
        <Link href="/health-policy" color="inherit" underline="hover">
          Health Policy
        </Link>
      </Typography>
    </Box>
          </Box>
        </Box>

        {/* Footer Copyright */}
        <Typography variant="body2" component="p" textAlign="center" fontSize="0.8rem" mt={2}>
          © {new Date().getFullYear()} Tzaneen Hotels. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
