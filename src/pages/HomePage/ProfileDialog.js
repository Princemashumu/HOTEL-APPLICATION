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
  TextField,
  IconButton,
} from '@mui/material';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import { ProfileDetailsMenu, BookingsMenu, FavouritesMenu, SavedRoomsMenu, SettingsMenu } from './ProfileMenuItems';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function ProfileDialog({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('profileDetails');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const auth = getAuth();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (open) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setEditName(currentUser.displayName || '');
          setEditEmail(currentUser.email || '');
        }
      });

      return () => unsubscribe();
    }
  }, [open, auth]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSave = () => {
    if (user) {
      updateProfile(user, {
        displayName: editName,
        email: editEmail,
      }).then(() => {
        setSnackbarOpen(true); // Show snackbar when saved
      }).catch((error) => {
        console.error("Error updating profile:", error);
      });
    }
  };

  const handleClose = () => {
    // Call handleSave to save changes
    handleSave();
    
    // Refresh the browser after a delay
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Adjust delay if necessary

    // Close the dialog
    // onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to initial values
    setEditName(user?.displayName || '');
    setEditEmail(user?.email || '');
  };

  const handleSignOut = () => {
    // Sign out user
    auth.signOut().then(() => {
      // Navigate to landing page
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'profileDetails':
        return (
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            {isEditing ? (
              <Box>
                <TextField
                  label="Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{
                      mr: 2,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelEdit}
                    sx={{
                      color: theme.palette.secondary.main,
                      borderColor: theme.palette.secondary.main,
                      '&:hover': {
                        borderColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary.dark,
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1">Name: {user?.displayName || 'N/A'}</Typography>
                <Typography variant="body1">Email: {user?.email || 'N/A'}</Typography>
                <IconButton
                  onClick={handleEditClick}
                  sx={{ mt: 2, color: theme.palette.primary.main }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
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
            <Button
              onClick={handleSignOut}
              sx={{ color: 'red', textTransform: 'none' }}
            >
              Sign Out
            </Button>
            {/* Add additional Settings content here */}
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
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          User Profile
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, minWidth: 0, padding: 1, color: theme.palette.text.primary }}
          >
            <CloseIcon />
          </IconButton>
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
