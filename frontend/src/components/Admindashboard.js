
import LeftNavBar from '../components/comp-admin/LeftNavBar.js';
import TopNavBar from '../components/comp-admin/TopNavBar.js';
import MainContent from './comp-admin/MainContent.js';
import { Route,Routes} from 'react-router-dom';
import RemoveUserPage from './comp-admin/RemoveUser.js';
import RemoveExpertPage from './comp-admin/RemoveExpertPage.js';
import { useState } from 'react';
import '../css/Admindashboard.css'
import SearchExpert from './comp-admin/SearchExpert.js';
import SelectExpert from './comp-admin/SelectExpert.js';
import AddJobForm from './comp-admin/AddJobForm.js';
import MyJobs from './comp-admin/MyJobs.js';
import LocationApp from './comp-admin/mapdisplay.js';
// import {  Route } from 'react-router-dom';

const Admindashboard = (value) => {
    const [currentView, setCurrentView] = useState('dashboard'); 
    const renderView = () => {
        switch (currentView) {
          case 'dashboard':
            return <MainContent />;
        case 'team':
            return <MainContent/>;
          case 'removeuser':
            return <RemoveUserPage />;
          case 'removeexpert' : 
          return <RemoveExpertPage/>;
          case 'searchexpert':
            return <SearchExpert/>;
        case 'selectexpert':
            return <SelectExpert/>;
        case 'addajob':
            return <AddJobForm/>;
        case 'myjobs':
            return <MyJobs/>
        case 'joblocations':
            return <LocationApp/>
         default:
            return <MainContent/>;
        }
      }
    return (
       
      <div className='fullapp'>

          <div className="dbapp-container">
             <LeftNavBar setCurrentView={setCurrentView} />
            <div className="dbcontent-container">
              <TopNavBar />
              <div className='adbchange'>  {renderView()}</div>
            
           
            </div> 
          </div>
          </div>

      );
}
 
export default Admindashboard;