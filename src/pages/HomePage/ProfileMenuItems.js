
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

export function ProfileDetailsMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemText primary="Profile Details" />
    </ListItem>
  );
}

export function BookingsMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemText primary="Bookings" />
    </ListItem>
  );
}

export function FavouritesMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemText primary="Favourites" />
    </ListItem>
  );
}

export function SavedRoomsMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemText primary="Saved Rooms" />
    </ListItem>
  );
}

export function SettingsMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemText primary="Settings" />
    </ListItem>
  );
}
