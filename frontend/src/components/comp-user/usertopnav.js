import React, { useState, useEffect } from 'react';

const UserTopNav = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/userName', {
          method: 'GET',
          credentials: 'include', // Include credentials such as cookies in the request
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserName(data.userName);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials such as cookies in the request
      });
      window.location.href = '/'; // Redirect to homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="userdbnav">
      <div className="leftusersection">Graduation World</div>
      <div className="middleusersection">User Dashboard</div>
      <div className="rightusersection">
        <span className="user-name">Welcome, {userName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default UserTopNav;