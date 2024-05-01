import React, { useState, useEffect } from 'react';

function TestResults() {
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/testResults');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTestResults(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className='resultsdisplaydiv'>
            <h2>Test Results</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className='applicantsresultsdisplay'>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Score</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map(result => (
                            <tr key={result._id}>
                                <td>{result.useremail}</td>
                                <td>{result.score}</td>
                                <td>{result.totalscore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TestResults;
