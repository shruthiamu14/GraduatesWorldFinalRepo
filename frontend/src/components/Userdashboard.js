import WelcomeCard from "./comp-user/usercard";
import UserLeftNav from "./comp-user/userleftnav";
import UserTopNav from "./comp-user/usertopnav";
import AvailableJobs from "./comp-user/useravailablejobs";
import AppliedJobs from "./comp-user/userappliedjobs";
import Usertest from "./comp-user/usertest";
import '../css/Userdashboard.css'
import { useState } from "react";
const Userdashboard = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

  const handleJobApply = (appliedJob) => {
    
    setAppliedJobs((prevJobs) => [...prevJobs, appliedJob]);
  };
    const [usercurrentView, setuserCurrentView] = useState('dashboard'); 
    const userrenderView = () => {
        switch (usercurrentView) {
          case 'dashboard':
            return <AvailableJobs onJobApply={handleJobApply}  />;
        case 'availablejobs':
            return <AvailableJobs onJobApply={handleJobApply} />;
          case 'appliedjobs':
            return <AppliedJobs appliedJobs={appliedJobs} />;
        case 'takeatest':
          return <Usertest/>
          default:
            return <AvailableJobs onJobApply={handleJobApply}  />;
        }
      }
    return ( 
        <div classsName="userdbbody">
             <UserTopNav />
            <WelcomeCard/>
             <div className="usercontainer">
            
             <UserLeftNav setuserCurrentView={setuserCurrentView} />
            <div className="usercontainer">
             
              <div className='useradbchange'>  
              {userrenderView()}</div>
            
           
            </div> 
          </div>
        </div>
     );
}
 
export default Userdashboard;