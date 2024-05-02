// RemoveUserPage.js
import React, { useState } from 'react';
// Import your CSS file for styling

const RemoveUserPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/remove_user', {
        method: 'POST',
       headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      if (response.ok) {
        console.log('User Removal successful');
        
        // Optionally, redirect the user or perform other actions upon successful login
      } else {
        console.error('Failed to remove user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="removeusercontainer">
      <div className="addjobformgroup">
      <h2>Remove  a User</h2>
      <form className='removeuserform'onSubmit={handleSubmit}>
        <label className='removeuserlabel'>
          User Email:
          <input type="email" className='removeuserinput' placeholder="Search a user..." value={email} onChange={handleEmailChange} />
        </label>
        <button  className='removeuserbtn'type="submit">Remove</button>
      </form>
      </div>
    </div>
  );
};

export default RemoveUserPage;
