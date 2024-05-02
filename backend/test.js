const axios = require('axios');
const mocha = require('mocha');

// Base URL for your server
const baseURL = 'http://localhost:5000/api';

// Testing register user with valid data
async function testRegisterValidUser() {
  try {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      phonenumber: '1234567890',
      educationLevel: 'Graduate',
      workExperience: 2,
      specialization: 'IT'
    };

    const response = await axios.post(`${baseURL}/register`, userData);
    console.log('Register User - Valid Data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing register user with invalid data
async function testRegisterInvalidUser() {
  try {
    const userData = {
      // Missing required fields
      username: 'testuser2',
      email: 'test2@example.com'
    };

    const response = await axios.post(`${baseURL}/register`, userData);
    console.log('Register User - Invalid Data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing login with valid credentials
async function testLoginValidUser() {
  try {
    const loginData = {
      email: 'gaganram503@gmail.com',
      password: 'Gaganram@143'
    };

    const response = await axios.post(`${baseURL}/login`, loginData);
    console.log('Login User - Valid Credentials:', response.data);
    return response.data.token; // Return token for subsequent tests
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing login with invalid credentials
async function testLoginInvalidUser() {
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    const response = await axios.post(`${baseURL}/login`, loginData);
    console.log('Login User - Invalid Credentials:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing logout
async function testLogout(token) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.post(`${baseURL}/logout`, {}, config);
    console.log('Logout:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing forgot password with valid email
async function testForgotPasswordValidEmail() {
  try {
    const emailData = {
      email: 'test@example.com'
    };

    const response = await axios.post(`${baseURL}/forgotpassword`, emailData);
    console.log('Forgot Password - Valid Email:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing forgot password with invalid email
async function testForgotPasswordInvalidEmail() {
  try {
    const emailData = {
      email: 'invalid@example.com'
    };

    const response = await axios.post(`${baseURL}/forgotpassword`, emailData);
    console.log('Forgot Password - Invalid Email:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing reset password with valid OTP
async function testResetPasswordValidOTP() {
  try {
    const passwordData = {
      otp: '123456', // Replace with valid OTP
      newPassword: 'newpassword'
    };

    const response = await axios.post(`${baseURL}/resetpassword`, passwordData);
    console.log('Reset Password - Valid OTP:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing reset password with invalid OTP
async function testResetPasswordInvalidOTP() {
  try {
    const passwordData = {
      otp: '654321', // Replace with invalid OTP
      newPassword: 'newpassword'
    };

    const response = await axios.post(`${baseURL}/resetpassword`, passwordData);
    console.log('Reset Password - Invalid OTP:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing creating a new quiz
async function testCreateQuiz(token) {
  try {
    const quizData = {
      title: 'Test Quiz',
      description: 'This is a test quiz',
      questions: [
        {
          question: 'What is 2 + 2?',
          options: ['1', '2', '3', '4'],
          correctAnswer: '4'
        },
        {
          question: 'What is 3 * 4?',
          options: ['9', '10', '11', '12'],
          correctAnswer: '12'
        }
      ]
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.post(`${baseURL}/quiz`, quizData, config);
    console.log('Create Quiz:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing getting all quizzes
async function testGetQuizzes() {
  try {
    const response = await axios.get(`${baseURL}/quiz`);
    console.log('Get Quizzes:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Testing taking a quiz
async function testTakeQuiz(token, quizId) {
  try {
    const response = await axios.get(`${baseURL}/quiz/${quizId}/take`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Take Quiz:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Call testing functions
async function runTests() {
  await testRegisterValidUser();
  await testRegisterInvalidUser();
  await testLoginValidUser();
  await testLoginInvalidUser();
  await testForgotPasswordValidEmail();
  await testForgotPasswordInvalidEmail();
  await testResetPasswordValidOTP();
  await testResetPasswordInvalidOTP();
  
  const token = await testLoginValidUser();
  await testCreateQuiz(token);
  await testGetQuizzes();
  // Assuming you have at least one quiz available
  await testTakeQuiz(token, 'replace_with_quiz_id');
  await testLogout(token);
}

// Run tests
runTests();

