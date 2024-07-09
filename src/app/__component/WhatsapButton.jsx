
import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const WhatsAppButton = ({ phoneNumber, cartItems }) => {
  const handleWhatsAppClick = () => {
    const message = generateMessage(cartItems);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const generateMessage = (cartItems) => {
    let message = "Checkout with the following items:\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.productName} - Price: ₦${item.price}.00\n`;
      
      // You can include more details like quantity, total price per item, etc., if needed
    });
    message += `\nSubTotal: ₦${calculateTotal(cartItems)}.00`; // Calculate total price of all items

    return message;
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <Box>
      <Button
        sx={{
          width: "100%",
          '&:hover': {
            backgroundColor: "#1EA952",
          },
          '&:focus': {
            backgroundColor: "#1EA952",
            outline: 'none',
          },
          backgroundColor: "#25d366",
          fontWeight: "500",
          py: 1,
        }}
        variant='contained'
        onClick={handleWhatsAppClick}
      >
        Checkout via WhatsApp
      </Button>
    </Box>
  );
};

export default WhatsAppButton;
