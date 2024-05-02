import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";

const UpdatePass = ({}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/pass_update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        console.log("Password Updated successfully")
        navigate('/userlogin');
      } else {
        console.error('Failed to update');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='Forgetbody'>
    
      <form onSubmit={handleSubmit} className='Forgetform'> 
      <h2>Enter Your password</h2>
      <br></br>

        <input className='Forgetinput'
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit" className='Forgetbutton'>Submit</button>
      </form>
    </div>
  );
};

export default UpdatePass;
