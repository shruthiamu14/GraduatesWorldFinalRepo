import React from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
const ThankTestPage = () => {
  return (
    
    <div className='Forgetbody'>
      <Navbar/>
   
      <h2> <pre>             Thank You for taking the test </pre><pre>                          </pre> 
      We will get back to you within 3 to 4 working days</h2>
      <Link to='/userdashboard'>
        Back
      </Link>
    
    </div>
  );
};

export default ThankTestPage;