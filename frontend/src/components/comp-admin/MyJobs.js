import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/availablejobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/job/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchJobs(); // Refresh the jobs list after deletion
        window.alert("Job deleted successfully");
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mjadmin-dashboard">
      
      <div className="mjjob-list">
      
        <div>
        <h1 className="mjh">All Jobs</h1>
        {jobs.map((job) => (
          <div className="mjjob" key={job._id}>
            <p>Title: {job.title}</p>
            <p>Category: {job.category}</p>
            <p>Country: {job.country}</p>
            <p>
              <Link to={`/job/${job._id}`}>View Details</Link>
            </p>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
          
        ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;