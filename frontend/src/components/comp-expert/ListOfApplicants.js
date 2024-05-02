import React, { useState, useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';

function ListOfApplicants() {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/applicants');
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
        <div className='usersdisplaydiv'>
            <h2><center>All Applicants</center> </h2>
            <br />
            <table className='listofapplicantsdisplay'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Education Level</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                </tr>
            </thead>
            <tbody>
                {applicants.map(applicant => (
                    <tr key={applicant._id}>
                        <td>{applicant.username}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.phonenumber}</td>
                        <td>{applicant.educationlevel}</td>
                        <td>{applicant.specialization}</td>
                        <td>{applicant.experience+" years"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div >
  )
}

export default ListOfApplicants;
