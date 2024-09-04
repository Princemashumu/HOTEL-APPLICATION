
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import {
  ProfileDetailsMenu,
  BookingsMenu,
  FavouritesMenu,
  SavedRoomsMenu,
  SettingsMenu,
} from './ProfileMenuItems';

function ProfileDialog({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('profileDetails');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const auth = getAuth();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (open) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }
      });

      return () => unsubscribe();
    }
  }, [open, auth]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSave = () => {
    // Simulate a save operation
    setTimeout(() => {
      setSnackbarOpen(true); // Show snackbar when saved
      
      // Refresh the browser after a delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 500); // Simulate save operation time
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'profileDetails':
        return (
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            {user && (
              <>
                <Typography variant="body1">Name: {user.displayName || 'N/A'}</Typography>
                <Typography variant="body1">Email: {user.email || 'N/A'}</Typography>
              </>
            )}
          </Box>
        );
      case 'bookings':
        return (
          <Box>
            <Typography variant="h6">Bookings</Typography>
            {/* Add Bookings content here */}
          </Box>
        );
      case 'favourites':
        return (
          <Box>
            <Typography variant="h6">Favourites</Typography>
            {/* Add Favourites content here */}
          </Box>
        );
      case 'savedRooms':
        return (
          <Box>
            <Typography variant="h6">Saved Rooms</Typography>
            {/* Add Saved Rooms content here */}
          </Box>
        );
      case 'settings':
        return (
          <Box>
            <Typography variant="h6">Settings</Typography>
            {/* Add Settings content here */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          User Profile
          <Button
            variant="outlined"
            color="purple"
            onClick={handleSave}
            sx={{ position: 'absolute', right: 8, top: 8, minWidth: 0, padding: 1 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Box display="flex">
            <List component="nav" sx={{ minWidth: 200 }}>
              <ProfileDetailsMenu
                selected={selectedMenu === 'profileDetails'}
                onClick={() => handleMenuClick('profileDetails')}
              />
              <BookingsMenu
                selected={selectedMenu === 'bookings'}
                onClick={() => handleMenuClick('bookings')}
              />
              <FavouritesMenu
                selected={selectedMenu === 'favourites'}
                onClick={() => handleMenuClick('favourites')}
              />
              <SavedRoomsMenu
                selected={selectedMenu === 'savedRooms'}
                onClick={() => handleMenuClick('savedRooms')}
              />
              <SettingsMenu
                selected={selectedMenu === 'settings'}
                onClick={() => handleMenuClick('settings')}
              />
            </List>
            <Divider orientation="vertical" flexItem />
            <Box flex={1} padding={2}>
              {renderContent()}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Profile updated"
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Profile updated
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProfileDialog;
