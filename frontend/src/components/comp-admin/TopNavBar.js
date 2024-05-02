import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Fetch admin name from the server
    const fetchAdminName = async () => {
      try {
        const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/adminName', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAdminName(data.adminName);
      } catch (error) {
        console.error('Error fetching admin name:', error);
      }
    };

    fetchAdminName();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/adminLogout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      window.location.href = '/'; // Redirect to homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (

    <div className="top-nav-bar">
      <div className="top-sec">
      <h1>Admin Dashboard  </h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..."  className='tpnavinput'/>
        <button type="buttons" className='adbsearch'>Search</button>
      </div>
  
      <div className="adbprofilesection">
        {/* <img
          src="path-to-profile-image.jpg"  
          alt="Profile"
          className="profile-image"
        />
        <br /> */}
  
        <span className="profile-name">   <pre>         Welcome</pre></span>
        <h4 className='profile-name-actual'><pre>{adminName}</pre></h4>

        <button onClick={handleLogout} className='logout-btn'>Logout</button>
        
      </div>
  </div>
  
  
  
      <div class="tpnavoverview-boxes">
                <div class="tpnavbox">
                    <div class="right-side">
                        <div class="adbbox-topic">WELCOME !!!</div>
                        <div class="number"><svg xmlns="http://www.w3.org/2000/svg" width="90" height="45"
                                fill="currentColor" class="bi bi-buildings" viewBox="0 0 16 16">
                                <path
                                    d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z" />
                                <path
                                    d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z" />
                            </svg>
                        </div>
  
  {/* 
                        <div class="button"  >
                            <Link to="/">View More</Link>
                           
                        </div> */}
                    </div>
  
                </div>
  
            </div>
  
  
  
    </div>
  );
};

export default AdminNavBar;
