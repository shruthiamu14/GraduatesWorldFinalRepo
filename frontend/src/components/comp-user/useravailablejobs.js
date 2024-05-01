// // AppliedJobs.js

// import React, { useState } from 'react';

// const AvailableJobs = ({onJobApply}) => {
//   // Replace this with your actual data
//   const [AvailableJobs, setAvailableJobs] =useState([
   
//     // Add more job entries as needed
//   ]);

//   const handleApply = (jobId) => {
//     const appliedJob = AvailableJobs.find((job) => job.id === jobId);
//     if (appliedJob) {
//       // Notify the parent component about the job application
//       onJobApply(appliedJob);
//       // Remove the applied job from the available jobs
//       setAvailableJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
//     }
//   };

//   return (
//     <div className="useravailablejobs">
//       <div className="usersearchbarandheading">
//       <h1 className='useravailh1'>Available Jobs</h1> <br></br>
//       </div>
//       <div>
//         <input type="text" placeholder="Search Available Jobs..." className="useravailsearch" />
    
//       </div>
//       <div className="useravailjobcards">
//         {AvailableJobs.map((job) => (
//           <div key={job.id} className="useravailjobcard">
//             <h3 className='useravailjobcard_h'>{job.company}</h3>
//             <p className='useravailjobcard_p'>{job.role}</p>
//             <p className='useravailjobcard_p'>{job.location}</p>
//             <p className='useravailjobcard_p'>Requirements: {job.requirements}</p>
//             <button className="useravailapplybutton" onClick={() => handleApply(job.id)} >Add-to-favourites</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableJobs;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // State to hold the list of available jobs
  const [availableJobs, setAvailableJobs] = useState([]);

  // Function to fetch available jobs from the backend
  const fetchAvailableJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/availablejobs");
      if (response.ok) {
        const data = await response.json();
        setAvailableJobs(data);
      } else {
        console.error("Failed to fetch available jobs");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch available jobs when the component mounts
  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  return (
    <div className="useravailablejobs">
      <div className="usersearchbarandheading">
        <h1 className='useravailh1'>Available Jobs</h1>
      </div>
      <div className="useravailjobcards">
        {availableJobs.map((job) => (
          <div className="card" key={job._id}>
            <p>{job.title}</p>
            <p>{job.category}</p>
            <p>{job.country}</p>
            <Link to={`/job/${job._id}`}>Job Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
