"use client";

import React, { useState } from 'react';

import axios from 'axios';

const CreateMeet = () => {
  const [authUrl, setAuthUrl] = useState('');
  const [eventData, setEventData] = useState(null);

  const getAuthUrl = async () => {
    
    const response = await axios.get('/auth-url');

    setAuthUrl(response.data.url);
  };

  const createMeet = async () => {
    const event = {
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
    };

    const response = await axios.post('/create-meet', event);

    setEventData(response.data);

  };

  return (
    <div>
      <button onClick={getAuthUrl}>Get Authentication URL</button>
      {authUrl && (
        <div>
          <a href={authUrl} target="_blank" rel="noopener noreferrer">
            Authenticate
          </a>
        </div>
      )}
      <button onClick={createMeet}>Create Google Meet</button>
      {eventData && (
        <div>
          <p>Meet Link: {eventData.hangoutLink}</p>
          <p>Event ID: {eventData.id}</p>
        </div>
      )}
    </div>
  );
};

export default CreateMeet;
