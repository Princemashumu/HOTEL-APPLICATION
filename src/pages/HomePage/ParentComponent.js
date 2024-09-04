import React, { useState } from 'react';
import { Button } from '@mui/material';
import ProfileDialog from './ProfileDialog'; // Adjust the import path as needed

function ParentComponent() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Profile
      </Button>
      <ProfileDialog open={dialogOpen} onClose={handleClose} />
    </div>
  );
}

export default ParentComponent;
