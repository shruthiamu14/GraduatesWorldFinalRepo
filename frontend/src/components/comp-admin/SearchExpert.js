// RemoveUserPage.js
import React, { useState } from 'react';
 // Import your CSS file for styling

const SearchExpert = () => {
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
    <div className="searchexpertcontainer">
      <div className="form-group">
      <h2>Search an Expert</h2>
      <form className='searchexpertform' onSubmit={handleSubmit}>
        <label className='searchexpertlabel'>
          Expert Name:
          <input className='searchexpertinput' type="text" placeholder="Search an expert..." value={username} onChange={handleUsernameChange} />
        </label>
        <button className='searchexpertbtn' type="submit">Search</button>
      </form>
      </div>
    </div>
  );
};

export default SearchExpert;
