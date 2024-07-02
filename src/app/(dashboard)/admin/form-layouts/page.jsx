"use client";


import React from 'react';

import Grid from '@mui/material/Grid';

import useVerifyToken from '../../VerifyToken'; 

import FormLayoutsBasic from '@views/form-layouts/FormLayoutsBasic';

console.log('useVerifyToken:', useVerifyToken);

const FormLayouts = () => {
  const { verifyData, expired, LogOut } = useVerifyToken();

  

  if (expired) {
    return <div>You are currently logged out. Please <button onClick={LogOut}>log in</button>.</div>;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <FormLayoutsBasic />
      </Grid>
    </Grid>
  );
};

export default FormLayouts;
