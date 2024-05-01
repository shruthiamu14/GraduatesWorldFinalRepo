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
            const response = await fetch('http://localhost:5000/api/addQuestion', {
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
        <div>
            <h2>Edit Quiz</h2>
            <h3>Add New Question</h3>
            <input type="text" value={newQuestion} onChange={handleNewQuestionChange} />
            <br />
            {newOptions.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleNewOptionChange(index, e)}
                />
            ))}
            <br />
            <select value={newAnswer} onChange={handleNewAnswerChange}>
                {newOptions.map((option, index) => (
                    <option key={index} value={index + 1}>{option}</option>
                ))}
            </select>
            <br />
            <button onClick={addNewQuestion}>Add Question</button>
            {quiz.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={item.question}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                    />
                    <br />
                    {item.options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                        />
                    ))}
                    <br />
                    <select value={item.answer} onChange={(e) => handleAnswerChange(index, e.target.value)}>
                        {item.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={optionIndex + 1}>{option}</option>
                        ))}
                    </select>
                    <hr />
                </div>
            ))}
            
        </div>
    );
};

export default EditQuiz;
