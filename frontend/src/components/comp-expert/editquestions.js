import React, { useState, useEffect } from 'react';

const EditQuiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState(['', '', '', '']);
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        // Fetch quiz data from the backend when component mounts
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/quiz');
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

    const handleQuestionChange = (index, value) => {
        const updatedQuiz = [...quiz];
        updatedQuiz[index].question = value;
        setQuiz(updatedQuiz);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const updatedQuiz = [...quiz];
        updatedQuiz[index].options[optionIndex] = value;
        setQuiz(updatedQuiz);
    };

    const handleAnswerChange = (index, value) => {
        const updatedQuiz = [...quiz];
        updatedQuiz[index].answer = parseInt(value);
        setQuiz(updatedQuiz);
    };

    const handleNewQuestionChange = (event) => {
        setNewQuestion(event.target.value);
    };

    const handleNewOptionChange = (index, event) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = event.target.value;
        setNewOptions(updatedOptions);
    };

    const handleNewAnswerChange = (event) => {
        setNewAnswer(event.target.value);
    };

    const addNewQuestion = async () => {
        const newQuizItem = {
            question: newQuestion,
            options: newOptions,
            answer: parseInt(newAnswer)
        };
        try {
            const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/addQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuizItem)
            });

            if (!response.ok) {
                throw new Error('Failed to add question');
            }

            // Clear input fields after adding new question
            setNewQuestion('');
            setNewOptions(['', '', '', '']);
            setNewAnswer('');
            
            // Fetch updated quiz data after adding the new question
            fetchQuizData();
        } catch (error) {
            console.error('Error adding question:', error);
            // Handle error
        }
    };

    return (
        <div className='eqdiv'>
    <h2 className='eqh2'>Edit Quiz</h2>
    <h3 className='eqh3'>Add New Question</h3>
    <label>
        Question:
        <input type="text" value={newQuestion} onChange={handleNewQuestionChange} className='eqinput' />
    </label>
    <br />
    {newOptions.map((option, index) => (
        <label key={index}>
            Option {index + 1}:
            <input
                type="text"
                value={option}
                onChange={(e) => handleNewOptionChange(index, e)}
                className='eqinput'
            />
        </label>
    ))}
    <br />
    <label>
        Correct Answer:
        <select value={newAnswer} onChange={handleNewAnswerChange} className='eqselect'>
            {newOptions.map((option, index) => (
                <option key={index} value={index + 1} className='eqoption'>{option}</option>
            ))}
        </select>
    </label>
    <br />
    <button onClick={addNewQuestion} className='eqbutton'>Add Question</button>
    {quiz.map((item, index) => (
        <div key={index} className='eqdiva'>
            <label>
                Question:
                <input
                    className='eqchecka'
                    type="text"
                    value={item.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
            </label>
            <br />
            {item.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                    Option {optionIndex + 1}:
                    <input
                        className='eqcheckb'
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                </label>
            ))}
            <br />
            <label>
                Correct Answer:
                <select value={item.answer} onChange={(e) => handleAnswerChange(index, e.target.value)} className='eqselectx'>
                    {item.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={optionIndex + 1} className='eqoptionf'>{option}</option>
                    ))}
                </select>
            </label>
            <hr />
        </div>
    ))}
</div>

    );
};

export default EditQuiz;
