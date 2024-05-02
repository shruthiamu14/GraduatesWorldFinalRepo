import React, { useState } from 'react';
import '../css/OTPForm.css';
import { useNavigate } from "react-router-dom";

const OTPForm = ({ }) => {
    const navigate = useNavigate();
  const [otp, setOTP] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/verify_otp2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        navigate('/expertupdatepass');
      } else {
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='Forgetbody'>
     
      <form onSubmit={handleSubmit} className='Forgetform'>
      <h2 className='Forgetheading'>Enter OTP</h2>
      <br></br>
        <input className='Forgetinput'
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
   
        <button type="submit" className='Forgetbutton'>Submit</button>
      </form>
    </div>
  );
};

export default OTPForm;
