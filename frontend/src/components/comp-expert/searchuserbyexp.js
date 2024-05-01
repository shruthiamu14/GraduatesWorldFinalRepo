// RemoveUserPage.js
import React, { useState } from 'react';
 // Import your CSS file for styling

const SearchUserByExpert = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Removing user: ${username}`);
    // Optionally, you can reset the form after submission
    setUsername('');
  };

  return (
    <div className="searchuserbyexpertcontainer">
      <div className="searchuserbyform-group">
      <h2>Search an User</h2>
      <form className='searchuserbyexpertform' onSubmit={handleSubmit}>
        <label className='searchuserbyexpertlabel'>
          User Name:
          <input className='searchuserbyexpertinput' type="text" placeholder="Search an User..." value={username} onChange={handleUsernameChange} />
        </label>
        <button className='searchuserbyexpertbtn' type="submit">Search</button>
      </form>
      </div>
    </div>
  );
};

export default SearchUserByExpert;
