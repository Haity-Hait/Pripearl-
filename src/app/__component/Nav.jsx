import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, useTheme } from '@mui/material/styles';

import CartDrawer from './CartDrawer';

import '@fontsource/uncial-antiqua';

const theme = createTheme({
  typography: {
    fontFamily: 'Uncial Antiqua, serif', // Use Uncial Antiqua as the default font
  },
});

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Example: Number of items in the cart
  const cartItemsCount = 3;
  
  const cartItems = [
    { name: 'Product 1', price: '$10', image: '/images/avatars/1.png' },
    { name: 'Product 2', price: '$20', image: '/images/avatars/1.png' },
    { name: 'Product 3', price: '$30', image: '/images/avatars/1.png' },
  ];

  const handleCartOpen = () => {
    setDrawerOpen(true);
  };

  const handleCartClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: "1px solid gainsboro" }}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4" component="div" sx={{ fontFamily: 'Uncial Antiqua, serif', color: "#5A3887", fontWeight: "400", fontStyle: "normal" }}>
              Pripearl
            </Typography>
          </Box>
          {/* Cart Icon with Badge */}
          <IconButton color="inherit" aria-label="cart" onClick={handleCartOpen}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <LocalMallOutlinedIcon sx={{ color: '#000' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer open={drawerOpen} onClose={handleCartClose} cartItems={cartItems} />
    </>
  );
};

export default Nav;
