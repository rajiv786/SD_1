import React, { useEffect, useCallback, useState, useRef } from 'react';
import JobCard from './JobCard';
import { Grid, Typography } from '@mui/material';
import Filters from './Filters';
const JobList = () => {
    const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
	minExperience: '',
	companyName: '',
	location: '',
	remoteOnSite: '',
	techStack: '',
	role: '',
	minBasePay: ''
  });
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
		const myHeaders = new Headers();
		console.log(filters.companyName,filters.minExperience)
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": 10,
		  "offset": offset,
		  "minExperience": filters.minExperience,
		  "companyName": filters.companyName
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const result = await response.json();
		console.log(result,'sfs')
      setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
      setOffset((prevOffset) => prevOffset + result.jdList.length);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
	const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	const body = document.body.offsetHeight;
	const windowBottom = windowHeight + window.scrollY;
	//when we reach at end then it will recall it 
	if (windowBottom >= body-10) {
	
	  fetchData();
	}
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
	  <>
		  <Grid item xs={12}>
			  <Typography style={{textAlign:'center',fontSize:'56px',lineHeight:'70px',marginTop:'25px',marginBottom:'25px'}}>WeekDay Project</Typography>
          <Filters onApplyFilters={setFilters} />
		  </Grid>
		  <Grid container spacing={2} sx={{marginTop:'20px'}}>
		{jobs.map((job, index) => {
  if (jobs.length === index + 1) {
    // Don't do anything for the last item
  } else {
    // Check if job meets the minimum experience requirement
    if (job.minExp >= filters.minExperience &&
		job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()) &&
		job.location.toLowerCase().includes(filters.location.toLowerCase())&&
		(filters.minJdSalary === '' || job.minJdSalary >= filters.minBasePay)&&
		job.jobRole.toLowerCase().includes(filters.role.toLowerCase())) {
      return (
		 
			  
	
			  <JobCard key={index} job={job} />
			
       
      );
    } else {
      return null; // Skip rendering this job if it doesn't meet the minimum experience requirement
    }
  }
		})}
			  </Grid>
     {/* Display loading indicator when fetching more jobs */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default JobList;
