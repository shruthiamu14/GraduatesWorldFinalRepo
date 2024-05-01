import React from 'react';

import { Link } from 'react-router-dom';
import '../css/Home.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
const Navbar = () => {
    const navigate = useNavigate();
   
  return (
    <div>
      <header>
        <Link to="/home">
          <img src={require("../imgANDvid/images/logo2.png")} alt="logo-here" className="logo" />
        </Link>

      
         <div className="menu-btn"></div>
        <div className="navigation">
          <div className="navigation-items">  
            <Link to="/home">Home</Link>
            
            <button onClick={() => navigate('/home#hi')}>Our Collaborations</button>
            
            <Link to="/contactabout">Contact</Link>
            <Link to="/contactabout">About</Link>
            <div className="dropdown">
              <Link to="#" className="dropbtn">Login</Link>
              <div className="dropdown-content">
                <br />
                <Link to="/userlogin">User-login</Link>
                <Link to="/expertlogin">Expert-login</Link>
                <Link to="/adminlogin">Admin-login</Link>
              </div>
            </div>
            <Link to="/register">Sign Up</Link>
          </div>
        </div> 
      </header>
    </div>
  );
}

export default Navbar;
