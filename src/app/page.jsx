"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import axios from 'axios';

const Page = () => {
  const [authUrl, setAuthUrl] = useState('');

  const generateMeetLink = async () => {
    try {
      const response = await axios.get('http://localhost:4000/generate-meet');
      console.log(response);
      // Ensure the authUrl is correctly formatted and safe to use
      setAuthUrl(response.data);
    } catch (error) {
      console.error('Error generating meet link:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Pripearl</h1>
      <Link href="/admin/login">
        <Button variant="contained">Admin Login</Button>
      </Link>

      <div>
        <h1>Generate Google Meet Link</h1>
        <Button variant="contained" onClick={generateMeetLink}>Generate Link</Button>
        {authUrl && <p><a href={authUrl} target="_blank" rel="noopener noreferrer">Click here to authorize and generate your meeting link</a></p>}
      </div>
    </div>
  );
};

export default Page;
