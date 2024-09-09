import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmBookingDialog = ({ open, onClose, room }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchCode, setBranchCode] = useState('');

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log('Booking confirmed with:', {
      accountNumber,
      accountName,
      bankName,
      branchCode,
    });
    onClose();
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