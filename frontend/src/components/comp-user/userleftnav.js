// UserLeftNav.js

import React from 'react';

const UserLeftNav = ({ setuserCurrentView }) => { return (
    <div className="userleftnav">
      <h2 className='userleftnavheading'>Main-Menu</h2>
      <input type="text" placeholder="Search..." className="userleftsearchbar" />
      <ul className="userleftnavlist">
        <button onClick={() => setuserCurrentView('dashboard')} className="userdb">
          <li className='udbli'>Dashboard</li>
        </button>
        <br />
        <button onClick={() => setuserCurrentView('availablejobs')} className="userdb">
          <li className='udbli'>Available Jobs </li> 
          </button> 
          <br />
          <button onClick={() => setuserCurrentView('appliedjobs')} className="userdb">
          <li className='udbli'>Favourites </li> 
          </button> 
          <br />
          <button onClick={() => setuserCurrentView('takeatest')} className="userdb">
          <li className='udbli'>Take a test</li> </button> <br />
          <button onClick={() => setuserCurrentView('available')} className="userdb">
          {/* <li className='udbli'>Search for an expert </li> */}
           </button> <br />
          
      </ul>
    </div>
  );
};

export default UserLeftNav;
