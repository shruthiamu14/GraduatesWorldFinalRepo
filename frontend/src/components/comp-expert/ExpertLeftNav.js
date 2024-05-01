// // ExpertLeftNav.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ExpertLeftNav = ({setexpertcurrentview}) => {
//   return (
//     <div className="expertleftnav">
//         <h2 className='expertnavheading'>Main-Menu</h2>
//       <input type="text" placeholder="Search..." className="expertleftnavsearchbar" />
//       <ul className="expertnavlist">

//       <button onClick={() => setexpertcurrentview('dashboard')} className="expertdb">
//           <li className='expertli'>Dashboard</li>
//         </button><br />
//         <button onClick={() => setexpertcurrentview('applicants')} className="expertdb">
//           <li className='expertli'>Applicants</li>
//         </button>
        
//         <button onClick={() => setexpertcurrentview('createtest')} className="expertdb">
//           <li className='expertli'>Create A Test</li>
//         </button>
//         <button onClick={() => setexpertcurrentview('searchuser')} className="expertdb">
//           <li className='expertli'>Search for user</li>
//         </button>
//       </ul>
//     </div>
//   );
// };

// export default ExpertLeftNav;
// ExpertLeftNav.js
// ExpertLeftNav.js
import React from 'react';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsBarChartLineFill

} from 'react-icons/bs';
import { FaFileCircleQuestion } from "react-icons/fa6";


import { RiUserSearchFill } from 'react-icons/ri';

function ExpertLeftNav({ onSidebarClick }) {
  return (
    <aside id='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>GRADUATES WORLD</div>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => onSidebarClick('dashboard')}>
          <BsGrid1X2Fill className='icon' /> Dashboard
        </li>
        <li className='sidebar-list-item' onClick={() => onSidebarClick('users')}>
          <BsPeopleFill className='icon' /> Users
        </li>
        {/* <li className='sidebar-list-item' onClick={() => onSidebarClick('createTest')}>
          <BsFillArchiveFill className='icon' /> Create a Test
        </li> */}
        {/* <li className='sidebar-list-item' onClick={() => onSidebarClick('searchUser')}>
          <RiUserSearchFill className='icon' /> Search For user
        </li> */}
        <li className='sidebar-list-item' onClick={() => onSidebarClick('userresults')}>
          <BsBarChartLineFill className='icon' /> Results 
        </li>
        <li className='sidebar-list-item' onClick={() => onSidebarClick('questions')}>
          <FaFileCircleQuestion className='icon' /> Test Questions
        </li>

      </ul>
    </aside>
  );
}

export default ExpertLeftNav;
