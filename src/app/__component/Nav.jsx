"use client";


import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CartDrawer from './CartDrawer';

import '@fontsource/uncial-antiqua';

import useVerifyToken from '../(dashboard)/VerifyToken';

const Nav = () => {
  const { products } = useVerifyToken();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateCartItems = () => {

      const cartIDs = JSON.parse(localStorage.getItem("pripearl_cart")) || [];
      const filteredItems = products.filter(product => cartIDs.includes(product._id));

      console.log("filtered " + filteredItems);

      setCartItems(filteredItems);

      setCartItemsCount(cartIDs.length);
    };

    // Initial count setup
    updateCartItems();

    // Event listener for cart updates
    window.addEventListener("cartUpdated", updateCartItems);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("cartUpdated", updateCartItems);
    };
  }, [products]);

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
            <Typography variant="h4" component="div" sx={{ fontFamily: 'Uncial Antiqua, serif', color: "#5A3887", fontWeight: "500", fontStyle: "normal" }}>
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
      <CartDrawer open={drawerOpen} cartItems={cartItems} onClose={handleCartClose} />
    </>
  );
};

export default Nav;
