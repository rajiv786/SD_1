import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const JobCard = ({ job }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}> {/* Adjust the grid sizes based on your layout */}
      <Card sx={{ maxWidth: 300, margin: 2 }}>
        <CardContent>
          <img src={job.logoUrl} alt={job.companyName} style={{ width: '100%', height: 'auto' }} />
          <Typography variant="h5" component="div">{job.title}</Typography>
          <Typography variant="subtitle1" component="div">{job.companyName}</Typography>
          <Typography variant="subtitle2" component="div">{job.location}</Typography>
          <Typography>{job.jobDetailsFromCompany}</Typography>
          <Typography variant="body2" component="div">Experience Required: {job.minExp}</Typography>
          <Button color="primary" variant="contained">Apply</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobCard;
