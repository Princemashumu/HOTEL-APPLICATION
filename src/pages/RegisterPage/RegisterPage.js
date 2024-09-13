import React from 'react';
import { Box, TextField, Button, Typography, Grid, Checkbox, FormControlLabel, Link, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { GridLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import RegisterHeader from './RegisterHeader';
import backgroundImage from './bannerImageS.jpg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth function
import { auth, db } from '../../firebase/firebaseConfig'; // Import auth and firestore instances
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

function RegisterPage() {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const navigate = useNavigate();

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      setFormError('You must accept the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'User', user.uid), {
        firstName,
        lastName,
        email,
        password,
        // You can add more fields here as needed
      });

      setSnackbarMessage('Account created successfully!');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/homepage');
      }, 2000); // Delay for Snackbar
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/loginpage');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          color: '#fff',
        }}
      >
        {/* Call the RegisterHeader component */}
        <RegisterHeader />

        {/* Conditional Loader */}
        {loading ? (
          <GridLoader color="#1a73e8" loading={loading} size={20} />
        ) : (
          <Box
            sx={{
              mt: 4,
              width: '90%',
              maxWidth: '600px',
              textAlign: 'center',
              backgroundColor: 'rgba(10, 0, 0, 0.7)',
              borderRadius: '12px',
              padding: 4,
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)',
            }}
          >
            <Typography variant="h4" sx={{ mb: 4, color: '#fff' }}>
              Sign Up
            </Typography>

            <Box component="form" sx={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    InputProps={{ style: { color: '#fff' } }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    InputProps={{ style: { color: '#fff' } }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    InputProps={{ style: { color: '#fff' } }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: { color: '#fff' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{ color: '#fff' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      style: { color: '#fff' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                            sx={{ color: '#fff' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleTermsChange}
                        sx={{
                          color: '#fff',
                          '&.Mui-checked': {
                            color: '#1a73e8',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: '#ccc' }}>
                        I accept the terms and conditions
                      </Typography>
                    }
                  />
                </Grid>
                {formError && (
                  <Grid item xs={12}>
                    <Typography sx={{ color: 'red', mb: 2 }}>
                      {formError}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                    disabled={loading}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Already have an account?{' '}
                    <Link
                      href="#"
                      onClick={handleLoginRedirect}
                      sx={{ color: '#1a73e8', textDecoration: 'none' }}
                    >
                      Log In
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          action={
            <Button color="inherit" onClick={handleCloseSnackbar}>
              Close
            </Button>
          }
        />
      </Box>
    </Box>
  );
}

export default RegisterPage;
