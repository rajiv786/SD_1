import React, { useEffect, useCallback, useState, useRef } from 'react';
import JobCard from './JobCard';
import { Grid } from '@mui/material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const observer = useRef();

  const fetchJobs = useCallback(async () => {
    if (fetchingData) return; // Prevent multiple fetches
    setFetchingData(true);
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": 10,
        "offset": offset
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
		
      setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
      setOffset((prevOffset) => prevOffset + result.jdList.length);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setFetchingData(false);
    }
  }, [offset, fetchingData]);

  const lastJobElementRef = useCallback(
    (node) => {
      if (loading || !node || fetchingData) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchJobs();
        }
      });
      observer.current.observe(node);
    },
    [loading, fetchJobs, fetchingData]
  );

  useEffect(() => {
    fetchJobs(); // Fetch initial jobs when component mounts
  }, [fetchJobs]);

  return (
    <div>
      {jobs.map((job, index) => {
        if (jobs.length === index + 1) {
			return (
				<Grid container spacing={2} ref={lastJobElementRef} key={job.id}>
            
					<JobCard job={job} />
					
					
					</Grid>
          );
        } else {
          return <Grid container spacing={2}> {/* Add spacing between the items */}
		  {jobs.map((job, index) => (
			<JobCard key={index} job={job} />
		  ))}
		</Grid>
        }
      })}
      {fetchingData && <p>Loading more jobs...</p>} {/* Display loading indicator when fetching more jobs */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default JobList;
