

import '../css/Computerscience.css';
import { Link } from 'react-router-dom';
const Jobselect = (props) => { 
    const jobs=props.joblists;
    return (
       
       <div className='jobs'>
            {jobs.map((job)=>(
                 <Link to={`/jobs/${job.id}`}>
                <div className='blog-preview' key={job.id}>
                
               
              <h1 className="jobtitle" title="Computer Science Faculty ">{job.title}</h1>
              <span className="edd">💼{job.time}</span><br />
              <span className="sal">💳{job.package} </span><br />
              <span className="locc">{job.location}</span><br />
            
              <Link to={`/jobs/${job.id}`} className="view-more-btn">View More</Link>

                </div>
                </Link>
            ))}
        </div>
       
      );
  }
export default Jobselect ;

