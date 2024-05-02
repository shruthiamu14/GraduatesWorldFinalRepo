import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import '../css/ForgotLogin.css';
const EmailForm = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate('/otp1');
      } 
      else {
        alert("Invalid Credentials")
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='Forgetbody'>
    
    
      <form onSubmit={handleSubmit} className='Forgetform'>
      <h2 className='Forgetheading'>Enter Your Email</h2>
      <br/>
        <input className='Forgetinput'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit" className='Forgetbutton'>Submit</button>
      </form>
  
    </div>
  );
};

export default EmailForm;
