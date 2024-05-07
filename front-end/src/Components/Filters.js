import React, { useState } from 'react';
import { TextField, Button, Grid, Select, MenuItem } from '@mui/material';

const Filters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remoteOnSite: '',
    techStack: '',
    role: '',
    minBasePay: ''
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          label="Min Experience"
          name="minExperience"
          value={filters.minExperience}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Company Name"
          name="companyName"
          value={filters.companyName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Select
          label="Remote/On-site"
          name="remoteOnSite"
          value={filters.remoteOnSite}
          onChange={handleChange}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="On-site">On-site</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <TextField
          label="Tech Stack"
          name="techStack"
          value={filters.techStack}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Role"
          name="role"
          value={filters.role}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Min Base Pay"
          name="minBasePay"
          value={filters.minBasePay}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" onClick={handleApplyFilters}>Apply Filters</Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
