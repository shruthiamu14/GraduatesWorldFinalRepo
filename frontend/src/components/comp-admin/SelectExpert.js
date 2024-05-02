// RemoveUserPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 // Import your CSS file for styling

const SelectExpert = () => {
  const [email, setEmail] = useState('');
  // const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(email)
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/select_expert', {
        method: 'POST',
       headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      console.log(email)
      if (response.ok) {
        console.log('Expert selection successful');
        
        // Optionally, redirect the user or perform other actions upon successful login
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="selectexpertcontainer">
      <div className='form-group'>
      <h2>Select an Expert</h2>
      <form onSubmit={handleSubmit} className="selectexpertform">
        <label className="selectexpertlabel">
          Expert Mail:
          <input type="email" className="selectexpertinput" placeholder="Enter mail of expert" value={email} onChange={handleEmailChange} />
        </label >
        <button className="selectexpertbtn" type="submit">Select</button>
      </form>
      </div>
    </div>
  );
};

export default SelectExpert;
