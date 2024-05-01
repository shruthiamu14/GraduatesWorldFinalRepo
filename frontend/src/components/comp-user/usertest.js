// import React from 'react';
// import {Link} from 'react-router-dom';

// const Usertest = () => {
//     return (

//         <form className="quizformuser">
//             <h1 className='h1className'>User Test</h1>
//             <h2 className="h2className">Question 1</h2>
//             <p>What is the largest unit of data storage?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q1" value="a" />
//                 a. Megabyte
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q1" value="b" />
//                 b. Kilobyte
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q1" value="c" />
//                 c. Gigabyte
//             </label>

//             <h2 className="h2className">Question 2</h2>
//             <p>What is the name of the programming language developed by Microsoft?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. Java
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. C#
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. Python
//             </label>

//             <h2 className="h2className">Question 3</h2>
//             <p>How do you start writing a for loop in Python?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. for x&gt;y
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. for x in y
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. for(x)
//             </label>

//             <h2 className="h2className">Question 4</h2>
//             <p>Which collection is ordered, changeable, and allows duplicate members?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. Tuple
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. List
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. Map
//             </label>

//             <h2 className="h2className">Question 5</h2>
//             <p>Which of these collections defines a TUPLE?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. {"{"}apple,{" "}banana,{" "}cherry{"}"}
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. {"{"}{"name"}:{"apple"},{" "}{"type"}:{"fruit"}{"}"}
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. {"{"}apple,{" "}banana:{"fruit"}{"}"}
//             </label>

//             <h2 className="h2className">Question 6</h2>
//             <p>Which method can be used to replace parts of a string?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. switch()
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. replace()
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. swap()
//             </label>

//             <h2 className="h2className">Question 7</h2>
//             <p>What is a correct syntax to return the first character in a string?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. x = "Hello".sub(0,1)
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. x = "Hello"[0]
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. x = "Hello[0]"
//             </label>
//             <h2 className="h2className">Question 8</h2>
//             <p>What is the correct way to create a function in Python?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. create myFunction()
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. def myFunction()
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. myFunction()
//             </label>

//             <h2 className="h2className">Question 9</h2>
//             <p>What is the name of the programming language developed by Microsoft?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. Java
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. C#
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. Python
//             </label>

//             <h2 className="h2className">Question 10</h2>
//             <p>How do you start writing a for loop in Python?</p>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="a" />
//                 a. for x&gt;y
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="b" />
//                 b. for x in y
//             </label>
//             <label className='labelclassName'>
//                 <input type="radio" name="q2" value="c" />
//                 c. for(x)
//             </label>
//             <br></br>
//             <br></br>
//             <Link to="/thankstestpage" class="buttonusertest">Submit</Link>

//         </form>
//     );
// }

// export default Usertest;

import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useHistory
import Quiz from './Quiz'; // Import the Quiz component

const Usertest = () => {
    const inputRef = useRef(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Get the history object
    const { username: usernameParam } = useParams(); // Get the username from params

    // Function to handle starting the quiz
    const handleStartQuiz = () => {
        const enteredUsername = inputRef.current.value;
        console.log(enteredUsername)
        // Send a request to check if the user's email is in the database
        fetch(`http://localhost:5000/api/checkUserTest/${enteredUsername}`)
        
            .then(response => { 
                if (!response.ok) {
               
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data =>
                 {
                    console.log('Data:', data);
                if (data.exists) {
                    // If the user's email exists in the database, display an alert
                    alert('Test already taken. Please wait for expert email.');
                } else {
                    // If the user's email doesn't exist, navigate to the quiz page
                    setUsername(enteredUsername);
                    navigate(`/quiz?username=${enteredUsername}`);
                }
            })
            .catch(error => {
                console.error('Error checking user test:', error);
                alert('Error checking user test. Please try again later.');
                // Handle error
            });
    };
    
    // If the username is already in the URL params, set it in the state
    if (usernameParam && !username) {
        setUsername(usernameParam);
    }

    return (
        <div className='firstquizcontainer'>
            <h1 className='firstquiztitle firstquiztext-light'><center>Test Application</center></h1>
            <br />

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>1 point is awarded for the correct answer.</li>
                <li>Each question has Four options. You can choose only one options.</li>
                <li>The result will be declared at the end of the quiz.</li>
                <li>After Completion of quiz your results will be evaluated by Expert and you will be notified.</li>
            </ol>

            <form id="firstquizform">
                <input ref={inputRef} className="firstquizuserid" type="text" placeholder='Enter Your Email*' />
            </form>

            <div className='firstquizstart'>
                <button className='firstquizbtn' onClick={handleStartQuiz}>Start Quiz</button>
            </div>

            
        </div>
    );
};

export default Usertest;
