// src/components/ParentComponent.js
import React, { useState } from 'react';
import Header from './Header';
import SignUpNotificationDialog from './SignUpNotificationDialog';

const ParentComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <div>
      <Header onBookNowClick={handleOpenDialog} />
      <SignUpNotificationDialog open={dialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default ParentComponent;
