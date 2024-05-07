// src/App.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import JobList from './Components/JobList';
import Filters from './Components/Filters';

function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <JobList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
