// src/components/JobList.js
import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs, selectJobs, selectLoading, selectError } from '../Redux/jobsSlice';
import JobCard from './JobCard';

const JobList = () => {
  const dispatch = useDispatch();
	const jobs = useSelector(selectJobs);
	// console.log(jobs)
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const observer = useRef();

  const lastJobElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchJobs({ limit: 10, offset: jobs.length }));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, dispatch, jobs.length]);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 10, offset: 0 }));
  }, [dispatch]);

  return (
	<div>
	  {Array.isArray(jobs.jdList) && jobs.jdList.map((job, index) => {
		if (jobs.jdList.length === index + 1) {
		  return <div ref={lastJobElementRef} key={job.id}><JobCard job={job} /></div>;
		} else {
		  return <JobCard key={job.id} job={job} />;
		}
	  })}
	  {loading && <p>Loading...</p>}
	  {error && <p>Error: {error}</p>}
	</div>
  );
  
};

export default JobList;
