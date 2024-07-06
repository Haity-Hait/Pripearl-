import React, { useState } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { Box, Typography, Paper } from '@mui/material';

import '@fontsource/uncial-antiqua';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const data = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1601387603639-387c75bdcb0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhZHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGpld2Vscmllc3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1560805949-7f26c001f3f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJlYWRzfGVufDB8fDB8fHww',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1609446154807-d56805f0e007?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhZHN8ZW58MHx8MHx8fDA%3D',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1616781247622-c92e86554135?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYWRzfGVufDB8fDB8fHww',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://media.istockphoto.com/id/930772422/photo/women-beads-and-necklace-in-jewerly-market-bali-island.webp?b=1&s=170667a&w=0&k=20&c=7LbBZ7u2pEtg2gSMHNQVopxcvkiwzwc1K7Jnzbw05Hw=',
  },
];

const HeroCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative' }}>
      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000} // Auto slide interval in milliseconds
      >
        {data.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="div"
                sx={{
                  height: '70vh',
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: '100%',
                    display: 'block',
                    maxWidth: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 8, // Rounded edges
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 8,
                    background: 'linear-gradient(to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))',
                  }}
                />
                <Paper
                  square
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'transparent',
                    position: 'absolute',
                    bottom: 16,
                    width: '100%',
                    color: '#fff',
                    background: 'rgba(0,0,0,0.5)',
                  }}
                >
                  <Typography variant="h6" component="div">
                    {step.label}
                  </Typography>
                </Paper>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
};

export default HeroCarousel;
