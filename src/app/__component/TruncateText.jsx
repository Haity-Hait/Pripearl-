"use client";

import React from 'react';

import { Typography } from '@mui/material';

import truncateText from '@/utils/truncateText';

const TruncatedText = ({ text, wordLimit, style }) => {
  const truncatedText = truncateText(text, wordLimit);

  return (
    <Typography sx={style}>
      {truncatedText}
    </Typography>
  );
};

export default TruncatedText;
