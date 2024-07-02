"use client";

import useVerifyToken from '../../VerifyToken'; // Adjust the path as necessary
import React from 'react';
import Grid from '@mui/material/Grid';
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
