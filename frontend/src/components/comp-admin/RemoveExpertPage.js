// RemoveUserPage.js
import React, { useState } from 'react';
 // Import your CSS file for styling

const RemoveExpertPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/remove_expert', {
        method: 'POST',
       headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      if (response.ok) {
        console.log('Expert Removal successful');
        
        // Optionally, redirect the user or perform other actions upon successful login
      } else {
        console.error('Failed to remove');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="removeexpertcontainer">
      <div className='form-group'>
      <h2>Remove an Expert</h2><br />
      <form className='removeexpeertform' onSubmit={handleSubmit}>
        <label className='removeexpertlabel'>
          Expert Mail:
          <input  className='removeexpertinput'type="email" placeholder="Search an expert..." value={email} onChange={handleEmailChange} />
        </label>
        <button className='removeexpertbtn' type="submit">Remove</button>
      </form>
      </div>
    </div>
  );
};

export default RemoveExpertPage;
