import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../firebase/firebaseConfig'; // Adjust the path as necessary

const ContactDialog = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for controlling Snackbar visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the email details to Firestore
      const contactDetails = {
        name,
        email,
        message,
        timestamp: new Date() // Add a timestamp for when the email was sent
      };
      await addDoc(collection(db, 'emails'), contactDetails);

      // Show Snackbar after successful submission
      setSnackbarOpen(true);

      // Reset form fields after submission
      setEmail('');
      setName('');
      setMessage('');

      // Close the dialog
      handleClose();
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Please fill out the form below to contact us.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Your Name"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Your Email"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Your Message"
              fullWidth
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </Box>
          </Box>
          <Button onClick={handleClose} sx={{ mt: 2 }} fullWidth variant="outlined">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar for email sent confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Email sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactDialog;
