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
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import { ProfileDetailsMenu, BookingsMenu, FavouritesMenu, SavedRoomsMenu, SettingsMenu } from './ProfileMenuItems';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ProfileDialog = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState('profileDetails');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    if (open) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);

          // Fetch user details from Firestore
          try {
            const userDocRef = doc(db, 'User', currentUser.uid); // Assuming 'User' is the collection name and UID is the document ID
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              setFirstName(userData.firstName || '');
              setLastName(userData.lastName || '');
              setEmail(userData.email || '');
            } else {
              console.log('No such user document!');
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [open, auth, db]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleSave = () => {
    if (user) {
      // Update user profile
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        email: email,
      }).then(() => {
        setSnackbarOpen(true); // Show snackbar when saved
      }).catch((error) => {
        console.error("Error updating profile:", error);
      });
    }
  };

  const handleClose = () => {
    handleSave();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFirstName(user?.displayName?.split(' ')[0] || ''); // Assuming displayName is used for first name
    setLastName(user?.displayName?.split(' ')[1] || ''); // Assuming displayName is used for last name
    setEmail(user?.email || '');
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
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
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Typography variant="body1">First Name: {firstName || 'N/A'}</Typography>
                <Typography variant="body1">Last Name: {lastName || 'N/A'}</Typography>
                <Typography variant="body1">Email: {email || 'N/A'}</Typography>
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
};

export default ProfileDialog;
