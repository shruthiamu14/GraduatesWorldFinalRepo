import React from 'react';
import { Link } from 'react-router-dom';

const Result = (props) => {

    const handleBackClick = () => {
        // Make an HTTP POST request to your backend endpoint
        fetch('http://localhost:5000/api/storeResults', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail: props.username, // Assuming userEmail is passed as a prop
                score: props.score,
                totalscore:props.totalScore
            }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Results stored successfully.');
                // Handle any additional logic (e.g., redirecting)
            } else {
                console.error('Failed to store results:', response.statusText);
                // Handle error
            }
        })
        .catch(error => {
            console.error('Error storing results:', error);
            // Handle error
        });
    };

    return (
        <>
            <div className='quiztestshow-score'>
                Your Score: {props.score}<br />
                Total Score: {props.totalScore}
            </div>
            <button id="quiztestnext-button" onClick={handleBackClick}>
                <Link to='/userdashboard'>
                    Done
                </Link>
            </button>
        </>
    );
}

export default Result;
