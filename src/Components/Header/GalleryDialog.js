import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; // Adjust the path as necessary
import { Dialog, DialogContent, DialogTitle, Box, Button } from '@mui/material'; // Import MUI components

const GalleryDialog = ({ open, handleClose }) => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    if (open) {
      // Fetch gallery items when dialog opens
      const fetchGalleryItems = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'gallery'));
          const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGalleryItems(items);
        } catch (error) {
          console.error('Error fetching gallery items:', error);
        }
      };

      fetchGalleryItems();
    }
  }, [open]);

  if (!open) return null; // Only render if open is true

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>Gallery</DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {galleryItems.map(item => (
            <Box key={item.id} m={2} textAlign="center" sx={{ flexBasis: 'calc(33.33% - 16px)' }}>
              <img
                src={item.url}
                // /alt={`Gallery image ${item.id}`}
                alt='img'
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          ))}
        </Box>
        <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
