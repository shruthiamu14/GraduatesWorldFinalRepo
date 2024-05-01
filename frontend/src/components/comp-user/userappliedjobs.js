// AppliedJobs.js

import React from 'react';

const AppliedJobs = ({ appliedJobs, onJobApply }) => {
  const handleApply = (jobId) => {
    // Assuming you want to call onJobApply when a job is applied
    onJobApply(jobId);
  };

  return (
    <div className="applied-jobs">
      <div className="userapplysearchbarandheading">
        <h2 className='useravailh2'>Favourites</h2>

      </div>
      <div className="userapplyjobcards">
        {appliedJobs.map((job) => (
          <div key={job.id} className="userapplyjobcard">
            <h3 className='userapplyjobcard_h'>{job.company}</h3>
            <p className='userapplyjobcard_p'>{job.role}</p>
            <p className='userapplyjobcard_p'>{job.location}</p>
            <p className='userapplyjobcard_p'>Requirements: {job.requirements}</p>
            <button onClick={() => handleApply(job.id)} className='viewmore'>
              view more {/* Example button to trigger applying the job */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
