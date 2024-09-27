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
  CircularProgress, // For loading
} from '@mui/material';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Import Firestore methods
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
  const [bookings, setBookings] = useState([]); // Store user bookings
  const [loadingBookings, setLoadingBookings] = useState(false); // Loading state for bookings

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

            // Fetch bookings from Firestore
            setLoadingBookings(true);
            const bookingsQuery = query(collection(db, 'bookings'), where('userID', '==', currentUser.uid));
            const bookingsSnapshot = await getDocs(bookingsQuery);

            const userBookings = bookingsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setBookings(userBookings);
          } catch (error) {
            console.error('Error fetching user details or bookings:', error);
          } finally {
            setLoadingBookings(false);
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

  const renderBookings = () => {
    if (loadingBookings) {
      return <CircularProgress />;
    }
  
    if (bookings.length === 0) {
      return <Typography>No bookings found.</Typography>;
    }
  
    return (
      <List>
        {bookings.map((booking) => {
          return (
            <Box key={booking.id} mb={2} p={2} border={1} borderRadius={4} borderColor="grey.300">
              {/* Display Room Details */}
              <Typography variant="h6">Room: {booking.roomDetails || 'N/A'}</Typography>
              
              {/* Display Email */}
              <Typography>Email: {booking.email || 'N/A'}</Typography>
  
              {/* Display Price in ZAR */}
              <Typography>Price: ZAR {booking.price ? (booking.price * 1).toFixed(2) : 'N/A'}</Typography>
  
              {/* Set status to "pending" */}
              <Typography>Status: {"pending"}</Typography>
            </Box>
          );
        })}
      </List>
    );
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
            {renderBookings()}
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
            sx={{
              position: 'absolute',
              right: theme.spacing(1),
              top: theme.spacing(1),
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex">
            {/* Left Sidebar with Menu */}
            <Box width="20%" mr={2}>
              <ProfileDetailsMenu onClick={() => handleMenuClick('profileDetails')} />
              <BookingsMenu onClick={() => handleMenuClick('bookings')} />
              <FavouritesMenu onClick={() => handleMenuClick('favourites')} />
              <SavedRoomsMenu onClick={() => handleMenuClick('savedRooms')} />
              <SettingsMenu onClick={() => handleMenuClick('settings')} />
            </Box>
            {/* Main Content */}
            <Box width="80%">
              {renderContent()}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileDialog;
