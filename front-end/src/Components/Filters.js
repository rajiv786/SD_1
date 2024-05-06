// src/components/Filters.js
import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const Filters = () => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField label="Min Experience" />
      </Grid>
      <Grid item>
        <TextField label="Company Name" />
      </Grid>
      {/* Add more filter components */}
      <Grid item>
        <Button color="primary" variant="contained">Apply Filters</Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
