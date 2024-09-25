import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { db, auth } from '../firebase'; // Import Firestore and Auth services
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

const ConfirmBookingDialog = ({ open, onClose, room }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const user = auth.currentUser; // Get current user from Firebase Auth

  const handleConfirm = async () => {
    if (user) { // Check if user is logged in
      try {
        // Add booking to Firestore
        await addDoc(collection(db, 'bookings'), {
          userId: user.uid, // User ID from Auth
          firstName: user.displayName?.split(' ')[0] || 'First Name', // Assuming user.displayName contains full name
          lastName: user.displayName?.split(' ')[1] || 'Last Name',
          accountNumber,
          accountName,
          bankName,
          branchCode,
          room: {
            name: room.name,
            price: room.price,
            // Add other room details if necessary
          },
          createdAt: new Date(), // Timestamp for when the booking was made
        });
        console.log('Booking confirmed!');
        onClose();
      } catch (error) {
        console.error('Error adding booking:', error);
      }
    } else {
      console.log('No user is logged in');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Confirm Booking
        <CloseIcon onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }} />
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">Please provide your banking details to confirm your booking for {room.name}</Typography>
        <TextField
          label="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Branch Code"
          value={branchCode}
          onChange={(e) => setBranchCode(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBookingDialog;
