import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const roomPrice = room.price;
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalCost = numberOfNights * roomPrice;

  const handlePaymentSuccess = (details) => {
    console.log('Payment successful:', details);
    setSnackbar({ open: true, message: "Payment successful! Thank you for your reservation.", severity: 'success' });
    onClose();
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    setSnackbar({ open: true, message: "Payment failed. Please try again.", severity: 'error' });
  };

  return (
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
            p: 2,
            bgcolor: theme.palette.background.paper,
            minHeight: '50vh'  // Set a minimum height to visually center the content
          }}
        >
          <Typography variant="h6">Room: {room.name}</Typography>
          <Typography>Check-In Date: {checkInDate}</Typography>
          <Typography>Check-Out Date: {checkOutDate}</Typography>
          <Typography>Guests: {guests}</Typography>
          <Typography>Price per Night: R{roomPrice.toFixed(2)}</Typography>
          <Typography>Total: R{totalCost.toFixed(2)}</Typography>

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

      {/* Snackbar for payment notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ReservationDetailsDialog;
