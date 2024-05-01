// import React, { useState, useEffect } from 'react';
// import { QuizData } from '../Data/QuizData.js';
// import Result from './TestResults';
// import { useLocation } from 'react-router-dom';

// function Quiz() {
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const username = searchParams.get('username');
//     console.log(username)

//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [score, setScore] = useState(0);
//     const [clickedOption, setClickedOption] = useState(0);
//     const [showResult, setShowResult] = useState(false);

//     const changeQuestion = () => {
//         updateScore();
//         if (currentQuestion < QuizData.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//             setClickedOption(0);
//         } else {
//             setShowResult(true);
//         }
//     };

//     const updateScore = () => {
//         if (clickedOption === QuizData[currentQuestion].answer) {
//             setScore(score + 1);
//         }
//     };

//     const resetAll = () => {
//         setShowResult(false);
//         setCurrentQuestion(0);
//         setClickedOption(0);
//         setScore(0);
//     };

//     useEffect(() => {
//         console.log(username); // Log the username when it changes
//     }, [username]);

//     return (
//         <div>
//             <p className="quiztestheading-txt"><center>TEST</center></p>
//             <div className="quiztestcontainer">
//                 {showResult ? (
//                     <Result username={username} score={score} totalScore={QuizData.length} tryAgain={resetAll} />
//                 ) : (
//                     <>
//                         <div className="quiztestquestion">
//                             <span id="quiztestquestion-number">{currentQuestion + 1}. </span>
//                             <span id="quiztestquestion-txt">{QuizData[currentQuestion].question}</span>
//                         </div>
//                         <div className="quiztestoption-container">
//                             {QuizData[currentQuestion].options.map((option, i) => {
//                                 return (
//                                     <button
//                                         className={`quiztestoption-btn ${
//                                             clickedOption === i + 1 ? 'checked' : null
//                                         }`}
//                                         key={i}
//                                         onClick={() => setClickedOption(i + 1)}>
//                                         {option}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                         <input type="button" value="Next" id="quiztestnext-button" onClick={changeQuestion} />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Quiz;
import React, { useState, useEffect } from 'react';
import Result from './TestResults';
import { useLocation } from 'react-router-dom';

function Quiz() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');
    console.log(username)

    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/quiz');
            if (!response.ok) {
                throw new Error('Failed to fetch quiz data');
            }
            const data = await response.json();
            setQuiz(data);
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            // Handle error
        }
    };

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < quiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true);
        }
    };

    const updateScore = () => {
        if (clickedOption === quiz[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    };

    return (
        <div>
            <p className="quiztestheading-txt"><center>TEST</center></p>
            <div className="quiztestcontainer">
                {showResult ? (
                    <Result username={username} score={score} totalScore={quiz.length} tryAgain={resetAll} />
                ) : (
                    <>
                        <div className="quiztestquestion">
                            <span id="quiztestquestion-number">{currentQuestion + 1}. </span>
                            <span id="quiztestquestion-txt">{quiz[currentQuestion]?.question}</span>
                        </div>
                        <div className="quiztestoption-container">
                            {quiz[currentQuestion]?.options.map((option, i) => {
                                return (
                                    <button
                                        className={`quiztestoption-btn ${
                                            clickedOption === i + 1 ? 'checked' : null
                                        }`}
                                        key={i}
                                        onClick={() => setClickedOption(i + 1)}>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        <input type="button" value="Next" id="quiztestnext-button" onClick={changeQuestion} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;
