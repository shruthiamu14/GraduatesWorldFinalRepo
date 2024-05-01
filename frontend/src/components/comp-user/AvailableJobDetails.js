import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AvailableJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/job/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data.job);
        } else {
          throw new Error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error:", error);
        navigateTo("/notfound");
      }
    };

    fetchJobDetails();
  }, [id, navigateTo]);

  window.addEventListener('scroll', function() {
    var navBar = document.querySelector('.left-nav-bar');
    var scrolled = window.scrollY;
  
    // Calculate the new height based on the scroll position
    var newHeight = 100 + scrolled * 0.9; // Example: increase height by 0.1 for every scrolled pixel
  
    // Apply the new height to the left navigation bar
    navBar.style.height = newHeight + 'px';
  });
  

  return (
    <section className="ajdjobDetail page">
      <div className="ajdcontainer">
        <h3>Job Details</h3>
        <div className="ajdbanner">
          <p className="ajdtitle">
            Title: <span> {job.title}</span>
          </p>
          <p className="ajdcategory">
            Category: <span>{job.category}</span>
          </p>
          <p className="ajdcountry">
            Country: <span>{job.country}</span>
          </p>
          <p className="ajdcity">
            City: <span>{job.city}</span>
          </p>
          <p className="ajdlocation">
            Location: <span>{job.location}</span>
          </p>
          <p className="ajddescription">
            Description: <span>{job.description}</span>
          </p>
          <p className="ajdjobpostedon">
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p className="ajdfixedsalary">
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          <Link to={`/application/${job._id}`}>Apply Now</Link>
        </div>
      </div>
    </section>
  );
};

export default AvailableJobDetails;