import  '../css/Computerscience.css'
import { Link } from 'react-router-dom';
import Jobselect from './JobList';
import { useState } from 'react';
const Computerscience = () => {
  

  const [Jobs, setJobs] = useState([
    { title: 'Computer Science Faculty For B.tech (AI,ML)', body: 'lorem ipsum...', time: '0 - 5 years',package:'₹ 8-9.5 Lacs P.A.',location:'Chennai', id: 1 },
    { title: 'Computer Science Faculty For B.tech (AI,ML)', body: 'lorem ipsum...', time: '0 - 5 years',package:'₹ 8-9.5 Lacs P.A.',location:'Chennai', id: 2 },
    { title: 'Computer Science Faculty For B.tech (AI,ML)', body: 'lorem ipsum...', time: '0 - 5 years',package:'₹ 8-9.5 Lacs P.A.',location:'Chennai', id: 3 },
    { title: 'Computer Science Faculty For B.tech (AI,ML)', body: 'lorem ipsum...', time: '0 - 5 years',package:'₹ 8-9.5 Lacs P.A.',location:'Chennai', id: 4 },
    { title: 'Computer Science Faculty For B.tech (AI,ML)', body: 'lorem ipsum...', time: '0 - 5 years',package:'₹ 8-9.5 Lacs P.A.',location:'Chennai', id: 5 },


  ])

    return ( 
        <div className='jobbody'>

<div className="sidebar">
    
      <div className="logo_name">
  
      <span >Welcome</span>
      
      </div>
      
      <ul className="nav-links">
      <Link to="/" className="active linktext">
        <li>
     
              <pre className="links_name">          Companies</pre>
            
          
        </li>
        </Link>
       
          <Link to="/team"  className="linktext">
          <li>
           
              <pre className="links_name">           Experience</pre>
          
            </li>
          </Link>
        
       
          <Link to="/removeuser" className="linktext">
          <li>
           
              <pre className="links_name">            Ratings</pre>
        
            </li>
          </Link>
       
      </ul>
    </div>
    <div className='jobcontent'>
     <Jobselect joblists={Jobs} /> </div>
</div>
     );
}
 
export default Computerscience;