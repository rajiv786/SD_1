// src/App.js
import React from 'react';
import { Container, Grid } from '@mui/material';
import JobList from './Components/JobList';
import Filters from './Components/Filters';

function App() {
  return (
    
      <Grid container spacing={3} style={{background:'beige'}}>
       <Container>
        <Grid item xs={12}>
          <JobList />
			  </Grid>
			  </Container>
      </Grid>

  );
}

export default App;
