import React from 'react';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

import { Button } from '@mui/material';

import WhatsAppButton from './WhatsapButton';

const CartDrawer = ({ open, onClose, cartItems, handleDelete, subtotal }) => {

  const adminWhatsAppNumber = "2348143416216"

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ overflow: "auto" }}>
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar src={item.images[0].image1.secure_url} />
              </ListItemAvatar>
              <ListItemText primary={item.productName} secondary={`Price: ₦${item.price}.00`} />
            </ListItem>
          )) : <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>Your shopping cart is empty.</Typography>}
        </List>

        <Box sx={{ position: "fixed", width: "275px", bottom: 0, py: 2 }}>
          <Typography variant="h6" sx={{ display: "flex", fontWeight: "600", width: "100%", justifyContent: "space-between", alignItems: "center" }}>SubTotal: <span>₦{subtotal}.00</span></Typography>
          <WhatsAppButton phoneNumber={adminWhatsAppNumber} cartItems={cartItems} />
        </Box>

      </Box>
    </Drawer>
  );
};

export default CartDrawer;
