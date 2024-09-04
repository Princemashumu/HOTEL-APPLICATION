
import React from 'react';
import { GridLoader } from 'react-spinners';
import { Box } from '@mui/material';

const Loader = () => (
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
      zIndex: 9999,
    }}
  >
    <GridLoader color="#36d7b7" />
  </Box>
);

export default Loader;
