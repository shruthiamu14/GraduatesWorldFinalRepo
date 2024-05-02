// import React, { useEffect, useState } from 'react';

// const Applicants = () => {
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/applicants');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       setApplicants(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>All Applicants</h2>
//       <table className='applicantsdisplay'>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {applicants.map(applicant => (
//             <tr key={applicant._id}>
//               <td>{applicant.username}</td>
//               <td>{applicant.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Applicants;
import React,{useState,useEffect} from 'react'
import { BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [userstest, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scoreDistribution, setScoreDistribution] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const applicantsResponse = await fetch('https://graduatesworldfinalrepo.onrender.com/api/applicants');
        if (!applicantsResponse.ok) {
          throw new Error('Failed to fetch applicants data');
        }
        const applicantsData = await applicantsResponse.json();
        setApplicants(applicantsData);
    
        const testResultsResponse = await fetch('https://graduatesworldfinalrepo.onrender.com/api/testResults');
        if (!testResultsResponse.ok) {
          throw new Error('Failed to fetch test results data');
        }
        const testResultsData = await testResultsResponse.json();
        setTestResults(testResultsData)
        const numberOfUsersTakenTest = testResultsData.length; // Get the length of test results array
        // Now you can use numberOfUsersTakenTest as needed, for example:
        console.log('Number of users who have taken the test:', numberOfUsersTakenTest);
        const scoresMap = new Map();
      testResultsData.forEach(result => {
        const score = result.score;
        scoresMap.set(score, (scoresMap.get(score) || 0) + 1);
      });

      // Convert scores map to an array of objects for Recharts
      const scoreDistributionArray = Array.from(scoresMap).map(([score, count]) => ({ score, count }));
      setScoreDistribution(scoreDistributionArray);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
  };
    
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='maincardsexpert'>
            <div className='cardexpertdb'>
                <div className='cardexpertdb-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='cardexpertdb_icon'/>
                    
                </div>
                <h1>{applicants.length}</h1>
                
            </div>
            <div className='cardexpertdb'>
                <div className='cardexpertdb-inner'>
                    <h3>TEST WRITTEN USERS</h3>
                    <BsPeopleFill className='cardexpertdb_icon'/>
                    
                </div>
                <h1>{userstest.length}</h1>
                
            </div>
           
        </div>

       
           <h1>Test Results Overview</h1>
        <div className='displayresultscharts'>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={scoreDistribution}
            margin={{ top: 20, right: 50, left: 50, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score"  />
            <YAxis label={{ value: 'Test Score', angle: -90, position: 'insideLeft', offset: -20 }} />            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#063970" name="Number of Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>
       
    </main>
  )
}

export default Applicants
