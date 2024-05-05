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
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON');
      const data = await response.json();
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
    fetchJobs();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
