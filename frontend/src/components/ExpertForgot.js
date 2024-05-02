import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const EmailForm = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/expert_forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/otp2');
      } else {
        setError(data.error || 'Email not found');
        
      }
    } catch (error) {
      setError('Email not found');
    }
  };

  return (
    <div className='Forgetbody'>
      <form onSubmit={handleSubmit} className='Forgetform'>
        <h2 className='Forgetheading'>Enter Your Email</h2>
        <br></br>
        <input className='Forgetinput'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button type="submit" className='Forgetbutton'>Submit</button>
        
      </form>
    </div>
  );
};

export default EmailForm;
