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
  const [subTotal, setSubtotal] = useState();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateCartItems = () => {
      const cartIDs = JSON.parse(localStorage.getItem("pripearl_cart")) || [];
      
      const filteredItems = products.filter(product => cartIDs.includes(product._id));
      
      console.log(filteredItems);


      setCartItems(filteredItems);
      setCartItemsCount(cartIDs.length);

      // Calculate the subtotal
      const subtotal = filteredItems.reduce((acc, item) => acc + item.price, 0);
      
      setSubtotal(subtotal);
    };

    updateCartItems();

    window.addEventListener("cartUpdated", updateCartItems);

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

  const handleItemDelete = (index) => {
    const cartIDs = JSON.parse(localStorage.getItem("pripearl_cart")) || [];
    const updatedCartIDs = cartIDs.filter((id, i) => i !== index);

    localStorage.setItem("pripearl_cart", JSON.stringify(updatedCartIDs));

    const updatedCartItems = cartItems.filter((item, i) => i !== index);

    setCartItems(updatedCartItems);
    setCartItemsCount(updatedCartIDs.length);

    const event = new Event('cartUpdated');
    
    window.dispatchEvent(event);
    
    window.location.reload()
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
          <IconButton color="inherit" aria-label="cart" onClick={handleCartOpen}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <LocalMallOutlinedIcon sx={{ color: '#000' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer open={drawerOpen} cartItems={cartItems} subtotal={subTotal} handleDelete={handleItemDelete} onClose={handleCartClose} />
    </>
  );
};

export default Nav;
