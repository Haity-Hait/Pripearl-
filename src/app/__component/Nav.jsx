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
  const { products, isLoading } = useVerifyToken(); // Assuming useVerifyToken provides isLoading
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updateCartItems = () => {
      try {
        // Safely get cart IDs from localStorage
        const cartIDs = JSON.parse(localStorage.getItem("pripearl_cart")) || [];
        setCartItemsCount(cartIDs.length);

        // Only proceed with filtering if products are available
        if (products && products.length > 0) {
          const filteredItems = products.filter(product =>
            product && product._id && cartIDs.includes(product._id)
          );

          setCartItems(filteredItems);

          // Calculate subtotal only if there are filtered items
          const subtotal = filteredItems.reduce((acc, item) =>
            acc + (item.price || 0), 0
          );
          setSubtotal(subtotal);
        }
      } catch (error) {
        console.error('Error updating cart items:', error);
        // Reset states in case of error
        setCartItems([]);
        setCartItemsCount(0);
        setSubtotal(0);
      }
    };

    // Only update cart items if products are loaded
    if (!isLoading && products) {
      updateCartItems();
    }

    // Add event listener for cart updates
    window.addEventListener("cartUpdated", updateCartItems);

    return () => {
      window.removeEventListener("cartUpdated", updateCartItems);
    };
  }, [products, isLoading]);

  const handleCartOpen = () => {
    setDrawerOpen(true);
  };

  const handleCartClose = () => {
    setDrawerOpen(false);
  };

  const handleItemDelete = (index) => {
    try {
      const cartIDs = JSON.parse(localStorage.getItem("pripearl_cart")) || [];
      const updatedCartIDs = cartIDs.filter((_, i) => i !== index);

      localStorage.setItem("pripearl_cart", JSON.stringify(updatedCartIDs));

      // Update local state
      const updatedCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCartItems);
      setCartItemsCount(updatedCartIDs.length);

      // Calculate new subtotal
      const newSubtotal = updatedCartItems.reduce((acc, item) =>
        acc + (item.price || 0), 0
      );
      setSubtotal(newSubtotal);

      // Dispatch cart update event
      window.dispatchEvent(new Event('cartUpdated'));

      // Note: Removing window.location.reload() as it's not necessary
      // and creates a poor user experience. The state updates above
      // should be sufficient to update the UI.
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: "1px solid gainsboro"
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontFamily: 'Uncial Antiqua, serif',
                color: "#5A3887",
                fontWeight: "500",
                fontStyle: "normal"
              }}
            >
              Pripearl
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="cart"
            onClick={handleCartOpen}
          >
            <Badge
              badgeContent={cartItemsCount}
              color="secondary"
            >
              <LocalMallOutlinedIcon sx={{ color: '#000' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer
        open={drawerOpen}
        cartItems={cartItems}
        subtotal={subTotal}
        handleDelete={handleItemDelete}
        onClose={handleCartClose}
      />
    </>
  );
};

export default Nav;
