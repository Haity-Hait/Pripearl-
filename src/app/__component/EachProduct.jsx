
import React from 'react';

import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

import TruncatedText from './TruncateText';

const EachProduct = ({ id, image, name, description, price, category, add2Cart, details }) => {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&:hover .hoverOverlay': {
          transform: 'translateY(0)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 300,
          borderRadius: '20px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '4px 8px',
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '20px',
          fontSize: '14px',
          textTransform: "capitalize"
        }}
      >
        {category}
      </Box>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textTransform: "capitalize", color: '#222' }}>
          {name}
        </Typography>
        <TruncatedText
          text={description}
          wordLimit={5}
          style={{ textTransform: "capitalize", color: '#222222d0', fontWeight: '500', fontSize: '15px', mt: '-4px' }}
        />
        <Typography variant="h6" component="p" sx={{ color: '#222', fontWeight: '600', mt: '8px' }}>
          ₦{price}
        </Typography>
      </CardContent>
      <Box
        className="hoverOverlay"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease-in-out',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#8c57ff",
            '&:hover': {
              backgroundColor: "#7a4bdb",
            },
            '&:focus': {
              backgroundColor: "#7a4bdb",
              outline: 'none',
            },
          }}
          onClick={() => add2Cart(id)}
        >
          Add to Cart
        </Button>
        <Button onClick={() => details(id)} variant="outlined" color="inherit">
          Details
        </Button>
      </Box>
    </Card>
  );
};

export default EachProduct;
