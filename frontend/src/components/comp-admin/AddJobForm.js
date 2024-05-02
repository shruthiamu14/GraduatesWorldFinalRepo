// import React, { useState } from 'react';

// const AddJobForm = () => {
//   const [formData, setFormData] = useState({
//     role: '',
//     company: '',
//     location: '',
//     requirements: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/addjobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({formData}),
//       });
  
//       if (response.ok) {
//         console.log('Jobs Added successfully');
//         // Optionally, redirect the user or perform other actions upon successful login
//       } else {
//         console.error('Failed to Add Jobs');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="addjobform"  >
//       <h2 className='addjobformheading'>Add a Job</h2>
//       <form onSubmit={handleSubmit} className="addjobformgroup">
//         <label className="addjobformlabel">
//           Role:
//           <input className="addjobforminput"
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label className="addjobformlabel">
//           Company:
//           <input className="addjobforminput"
//             type="text"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label className="addjobformlabel">
//           Location:
//           <input className="addjobforminput"
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </label >
//         <br />
//         <label className="addjobformlabel">
//           Requirements:
//           <br />
//           <textarea className="addjobformtextarea"
//             name="requirements"
//             value={formData.requirements}
//             onChange={handleChange}
//             required
//           />
//         </label >
//         <br />
//         <button  className="addjobformbtn" type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddJobForm;

// PostJob.js

import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "default",
  });

  // const { isAuthorized, user } = useContext(Context);
  // const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://graduatesworldfinalrepo.onrender.com/api/addjobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Jobs Added successfully');
    } else {
      console.error('Failed to Add Jobs');
    }
  };

  // if ( (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  return (
    <>
      <div className="job_post page">
        <div className="ajfcontainer">
          
          <form onSubmit={handleSubmit}>
          <h3>POST NEW JOB</h3>
            {/* Your input fields here */}
            <input className="ajftitle"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
            />
            <textarea className="ajfdescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description"
              required  // Add required attribute
            ></textarea>
            <input className="ajfcategory"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Job Category"
              required  // Add required attribute
            />
            <input className="ajfcountry"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              required  // Add required attribute
            />
            <input className="ajfcity"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required  // Add required attribute
            />
            <input className="ajflocation"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required  // Add required attribute
            />
            <input className="ajfsalaryform"
              type="number"
              name="salaryFrom"
              value={formData.salaryFrom}
              onChange={handleChange}
              placeholder="Salary From"
              required  // Add required attribute
            />
            <input className="ajfsalaryto"
              type="number"
              name="salaryTo"
              value={formData.salaryTo}
              onChange={handleChange}
              placeholder="Salary To"
              required  // Add required attribute
            />
            <input className="ajffixedsalary"
              type="number"
              name="fixedSalary"
              value={formData.fixedSalary}
              onChange={handleChange}
              placeholder="Fixed Salary"
              required  // Add required attribute
            />
            <button type="submit" className="addjobformbtn">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJobForm;
