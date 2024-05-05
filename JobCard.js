import React, { useState, useEffect } from 'react';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch initial job listings
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // Fetch job listings from API
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON');
      const data = await response.json();
      // Update jobs state with fetched data
      setJobs(prevJobs => [...prevJobs, ...data.jobs]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== 
      document.documentElement.offsetHeight
    ) return;
    fetchJobs(); // Fetch more job listings
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMoreJobs = async () => {
    setIsLoading(true);
    try {
      // Make an API call to fetch more job listings
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: 10, // Number of jobs to fetch
          offset: jobs.length, // Calculate offset based on already fetched jobs
        }),
      });
      const data = await response.json();
      // Update jobs state with newly fetched job listings
      setJobs(prevJobs => [...prevJobs, ...data.jobs]);
    } catch (error) {
      console.error('Error fetching more jobs:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Experience: {job.experience}</p>
          <button>Apply Now</button>
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default JobListings;
