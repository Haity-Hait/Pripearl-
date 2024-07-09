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

const CartDrawer = ({ open, onClose, cartItems }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={item.images[0].image1.secure_url} />
              </ListItemAvatar>
              <ListItemText primary={item.productName} secondary={`Price:  ₦${item.price}.00`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
