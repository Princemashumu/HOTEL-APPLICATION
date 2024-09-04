import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

const SignUpNotificationDialog = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    console.log('Sign Up clicked'); // Debugging
    setLoading(true); // Show the loader
    console.log('Loading state:', loading); // Debugging to ensure state is set

    setTimeout(() => {
      setLoading(false);
      navigate('/registerpage'); // Redirect after the simulated loading time
    }, 1000); // Simulate loading delay (e.g., 1 second)
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '25px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#ffffff',
            color: '#333333',
            fontWeight: 'bold',
            borderBottom: '1px solid #e0e0e0',
            borderRadius: '25px 25px 0 0',
            padding: '16px 24px',
            textAlign: 'center',
          }}
        >
          Sign Up or Log In Required
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '24px',
            backgroundColor: '#ffffff',
            color: '#555555',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          <Typography variant="body1">
            You need to sign up or log in to confirm your booking. Please proceed to the sign-up or login page to continue.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            padding: '16px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e0e0e0',
            borderRadius: '0 0 25px 25px',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            color="secondary"
            sx={{
              borderRadius: '25px',
              padding: '10px 20px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUpClick}
            sx={{
              borderRadius: '25px',
              padding: '10px 20px',
              textTransform: 'none',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                backgroundColor: '#004a8c',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            Go to Sign Up / Log In
          </Button>
        </DialogActions>
      </Dialog>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000, // Increase zIndex to ensure it's on top
          }}
        >
          <GridLoader color="#ffffff" loading={loading} size={30} />
        </Box>
      )}
    </>
  );
};

export default SignUpNotificationDialog;
