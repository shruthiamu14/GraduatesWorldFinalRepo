// import '../css/Expertdashboard.css';
// import WelcomeCardExp from './comp-expert/Cardexp';
// import Applicants from './comp-expert/ExpertApplicants';
// import ExpertLeftNav from './comp-expert/ExpertLeftNav';
// import ExpertNav from './comp-expert/ExpertNav';
// import SearchUserByExpert from './comp-expert/searchuserbyexp';
// import { useState } from 'react';



// function Expertdashboard() {
//     const [currentexpertView, setexpertcurrentview] = useState('dashboard');
//     const renderView = () => {
//         switch (currentexpertView) {

//             case 'applicants':
//                 return <Applicants />;
//             case 'dashboard':
//                 return <Applicants />;
//             case 'searchuser':
//                 return <SearchUserByExpert />;
//             case 'createtest':
//                 return <Applicants />;
//             default:
//                 return <WelcomeCardExp />;
//         }
//     }

//     return (

//         // <div className="expertappcontainer">
//         //     < ExpertNav />
//         //     <div className="mainexpertcontent">
//         //         <WelcomeCardExp />
               
//         //         <ExpertLeftNav setexpertcurrentview={setexpertcurrentview} />
               


               
//         //     </div>
//         //     <div>
//         //     {renderView()}
//         //     </div>
//         // </div>
//         <div className="page-container">
//         <nav className="top-navbar"><ExpertNav/></nav>
//          <div className="welcome-card"><WelcomeCardExp/></div>
//         <div className="sidebar"><ExpertLeftNav setexpertcurrentview={setexpertcurrentview} /></div>
//          <div className="content">
//          {renderView()}
//            </div>
// </div>



//     );
// }

// export default Expertdashboard;

import { useState } from 'react';
import '../css/Expertdashboard.css';
import SearchUserByExpert from './comp-expert/searchuserbyexp';
import WelcomeCardExp from './comp-expert/Cardexp';
import Applicants from './comp-expert/ExpertApplicants';
import ListOfApplicants from './comp-expert/ListOfApplicants';
import ExpertLeftNav from './comp-expert/ExpertLeftNav';
import ExpertNav from './comp-expert/ExpertNav';
import TestResults from './comp-expert/Resultsdisplay';
import EditQuiz from './comp-expert/editquestions';
function Expertdashboard() {
  const [currentView, setCurrentView] = useState('dashboard'); // State to track current view

  // Function to handle sidebar navigation clicks
  const handleSidebarClick = (view) => {
    setCurrentView(view);
  };

  // Function to render component based on current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Applicants />;
      // case 'searchUser':
      //   return <SearchUserByExpert />;
      case 'users':
        return <ListOfApplicants />;
      case 'userresults':
        return <TestResults />;
      case 'questions':
        return <EditQuiz/>
      default:
        return <WelcomeCardExp />;
    }
  };

  return (
    <div className='expertgrid-container'>
     
      <ExpertLeftNav onSidebarClick={handleSidebarClick} />
      <ExpertNav />
      <div className='expertmiddle-content'>
        {renderView()}
      </div>
    </div>
  );
}

export default Expertdashboard;

