import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';  // Import the icon
import { collection, addDoc } from 'firebase/firestore';  // Firestore import
import { db, auth } from '../../firebase/firebaseConfig';  // Firestore and Auth instances from your firebase config

// PayPal Client ID
const paypalClientId = "AZtKp0ZrEtUmRFQT5KQOToUSdEXms90Oks0Cnni6BqB3Ok1l4SlSsbTI2z-e3VkDNTVQg7-tPzaoBMKt";

const PayPalPayment = ({ amount, onPaymentSuccess, onPaymentFailure }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toFixed(2),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        setIsProcessing(true);
        return actions.order.capture().then((details) => {
          setIsProcessing(false);
          onPaymentSuccess(details);
        }).catch((error) => {
          setIsProcessing(false);
          onPaymentFailure(error);
        });
      }}
      onError={(error) => {
        setIsProcessing(false);
        onPaymentFailure(error);
      }}
    />
  );
};

const ReservationDetailsDialog = ({ open, onClose, room, checkInDate, checkOutDate, guests }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false); // State for success dialog
  const [userEmail, setUserEmail] = useState(null); // State for storing user email
  const [userID, setUserID] = useState(null); // State for storing user ID

  const roomPrice = room.price;
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalCost = numberOfNights * roomPrice;

  // Get user email and ID from auth
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email); // Set user email if logged in
      setUserID(user.uid);       // Set user ID if logged in
    }
  }, []);

  const handlePaymentSuccess = async (details) => {
    console.log('Payment successful:', details);
    
    // Store booking in Firestore
    try {
      const bookingsRef = collection(db, 'bookings');
      await addDoc(bookingsRef, {
        userID: userID,          // Use the logged-in user's ID
        firstName: 'John',      // Replace with actual first name
        lastName: 'Doe',        // Replace with actual last name
        email: userEmail,       // Use the logged-in user's email
        roomDetails: room.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        price: totalCost
      });
      console.log("Booking stored successfully!");
      setPaymentDialogOpen(true);  // Open success dialog
    } catch (error) {
      console.error("Error storing booking: ", error);
    }
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
    onClose(); // Close the main reservation dialog
  };

  return (
    <>
      {/* Main Reservation Dialog */}
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={fullScreen}
        maxWidth="xl"
        fullWidth={true}
      >
        <DialogTitle sx={{ backgroundColor: theme.palette.grey[200], textAlign: 'center' }}>
          Reservation Details
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',    // Centers content horizontally
              justifyContent: 'center', // Centers content vertically
              gap: 2,
              border: '1px solid blue',
              p: 2,
              bgcolor: theme.palette.background.paper,
              minHeight: '50vh'  // Set a minimum height to visually center the content
            }}
          >
            <Typography variant="h6">Room: {room.name}</Typography>
            <Box   sx={{ 
                border: '1px solid', 
                borderColor: theme.palette.grey[400], 
                borderRadius: '8px', 
                padding: '8px', 
                width: '100%',
                textAlign: 'center',
                justifyContent:'center'
              }}
            >
              <Typography>Check-In Date: {checkInDate}</Typography>
              <Typography>Check-Out Date: {checkOutDate}</Typography>
              <Typography>Number of Guests: {guests}</Typography>
            </Box>
            
            <Box   sx={{ 
                border: '1px solid', 
                borderColor: theme.palette.grey[400], 
                borderRadius: '8px', 
                padding: '8px', 
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Typography>Price per Night: R{roomPrice.toFixed(2)}</Typography>
              <Typography>Total: R{totalCost.toFixed(2)}</Typography>
            </Box>
            {/* PayPal Payment Integration */}
            <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
              <PayPalPayment
                amount={totalCost}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
              />
            </PayPalScriptProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Success Dialog */}
      <Dialog
        open={paymentDialogOpen}
        onClose={handleClosePaymentDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Payment Successful
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              textAlign: 'center',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Success Icon */}
            <IoCheckmarkDoneCircleOutline size={64} color="green" />

            <Typography variant="body1" sx={{ mt: 2 }}>
              Successful payment, please check your emails for the reservation details.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationDetailsDialog;
