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
//       const response = await fetch('http://localhost:5000/api/applicants');
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
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applicants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setApplicants(data);
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
                    {/* <BsFillArchiveFill className='cardexpertdb_icon'/> */}
                </div>
                <h1>{applicants.length}</h1>
            </div>
            {/* <div className='cardexpertdb'>
                <div className='cardexpertdb-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='cardexpertdb_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='cardexpertdb'>
                <div className='cardexpertdb-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='cardexpertdb_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='cardexpertdb'>
                <div className='cardexpertdb-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='cardexpertdb_icon'/>
                </div>
                <h1>42</h1>
            </div> */}
        </div>

        <div className='charts'>
            {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer> */}

        </div>
    </main>
  )
}

export default Applicants