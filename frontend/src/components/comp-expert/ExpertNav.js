// import React from 'react';

// const mapStateToProps = (state) => ({
//   expertEmail: state.expert.email,
//   expertName: state.expert.name,
// });
// const ExpertNav = () => {

//   return (
//     <nav className="experttopnav">
//       <div className="experttopleft-section">Graduation World</div>
//       <div className="experttopmiddle-section">Expert Dashboard</div>
//       <div className="experttopright-section">
//         {/* <img src="" alt="User Logo" className="expert-logo" /> */}
//         <span className="expert-name">Welcome, {ExpertName}</span>
//       </div>
//     </nav>
//   );
// };

// const ExpertName = 'Shyam';

// export default ExpertNav;
// import React from 'react'
// import 
//  {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
//  from 'react-icons/bs'

// function ExpertNav({OpenSidebar}) {
//   return (
//     <header className='header'>
//         <div className='menu-icon'>
//             <BsJustify className='icon' onClick={OpenSidebar}/>
//         </div>
//         <div className='header-left'>
//             <BsSearch  className='icon'/>
//         </div>
//         <div className='header-right'>
//             <BsFillBellFill className='icon'/>
//             <BsFillEnvelopeFill className='icon'/>
//             <BsPersonCircle className='icon'/>
//         </div>
//     </header>
//   )
// }

// export default ExpertNav;
import React, { useState, useEffect } from 'react';

const ExpertNav = () => {
  const [expertName, setExpertName] = useState('');

  useEffect(() => {
    // Fetch expert name here
    const fetchExpertName = async () => {
      try {
        // Make API call to fetch expert name
        const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/expertName', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expert name');
        }

        const data = await response.json();
        setExpertName(data.expertName);
      } catch (error) {
        console.error('Error fetching expert name:', error);
      }
    };

    fetchExpertName();
  }, []);

  const handleLogout = async () => {
    try {
      // Make API call to logout
      await fetch('https://graduatesworldfinalrepo.onrender.com/api/expertLogout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/'; // Redirect to homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="experttopnav">
      <div className="experttopleft-section">Graduates World</div>
      <div className="experttopmiddle-section">Expert Dashboard</div>
      <div className="experttopright-section">
        <span className="expert-name">Welcome, {expertName}</span>
        <button onClick={handleLogout} className='expertclassbutton'>Logout</button>
      </div>
    </nav>
  );
};

export default ExpertNav;
