import React from 'react';
import { Box, TextField, Button, Typography, Grid, Link, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { GridLoader } from 'react-spinners';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import backgroundImage from './bannerImageS.jpg';
import RegisterHeader from '../RegisterPage/RegisterHeader';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setFormError('');
    if (!email || !password) {
      setFormError('Email and Password are required.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Logged in successfully!');
      setOpenSnackbar(true);
      navigate('/homepage'); // Redirect to the home page after success
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }} />

      {loading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <GridLoader color="#fff" loading={loading} size={30} />
        </Box>
      )}

      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#fff' }}>
        <RegisterHeader />

        <Box sx={{ mt: 4, width: '90%', maxWidth: '400px', textAlign: 'center', backgroundColor: 'rgba(10, 0, 0, 0.7)', borderRadius: '12px', padding: 4, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.4)' }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Log In
          </Typography>
          
          <Box component="form" sx={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
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
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: '#1a73e8',
                    color: '#fff',
                    padding: '12px 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#155ab6',
                      transform: 'scale(1.05)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: 'rgba(26, 115, 232, 0.5)',
                      color: '#ccc',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Log In'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link href="#" sx={{ color: '#1a73e8', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Forgot Password?
            </Link>
          </Typography>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={successMessage}
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

export default LoginForm;
