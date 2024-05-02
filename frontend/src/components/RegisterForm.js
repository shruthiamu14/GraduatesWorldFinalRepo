

import FormInput from "./Forminput";
import { useState } from "react";
import '../css/RegistrationForm.css';
import { Link,useNavigate } from "react-router-dom";
const Registerform = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    educationLevel: "",
    workExperience: "",
    specialization: "",
  });
  const specializationOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Electronics and Communication", label: "Electronics and Communication" },
    { value: "Civil", label: "Civil" },
    { value: "Mechanical", label: "Mechanical" },
  ];

  const inputs = [
    // Existing inputs
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:
      "Email should be 3-16 characters and shouldn't include any special character!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phonenumber",
      type: "tel",
      placeholder: "Phone Number",
      label: "Phone Number",
      pattern: "[0-9]{10}",
      errorMessage: "Please enter a valid phone number.",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "educationLevel",
      type: "text",
      placeholder: "Education Level",
      label: "Education Level",
      required: true,
    },
    {
      id: 7,
      name: "workExperience",
      type: "text",
      placeholder: "Work Experience",
      label: "Work Experience",
      required: true,
    },
    {
      id: 8,
      name: "specialization",
      type: "select",
      placeholder: "Specialization",
      label: "Specialization",
      options: specializationOptions,
      required: true,
    },
    {
      id: 9,
      name: "resume",
      type: "file",
      placeholder: "Resume",
      label: "Resume",
      required: true,
    },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate("/otp")
        // Optionally, redirect the user or perform other actions upon successful registration
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle input change
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="registerapp">
      <form onSubmit={handleSubmit} className="rgform">
        <h1 className="rgformheading">Register</h1>
        {step === 1 && (
          <>
            {inputs.slice(0, 4).map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
             <p className="rgformforgot">Already have an account?<Link to='/userlogin'>Sign-in</Link></p>
            <button type="button" onClick={handleNext} className="rgsubmit">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            {inputs.slice(4).map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
                         <p className="rgformforgot">Already have an account?<Link to='/userlogin'>Sign-in</Link></p>

            <button type="button" onClick={handlePrev} className="rgsubmit">Previous</button>
            <button type="submit" className="rgsubmit">Submit</button>
          </>
        )}
      </form>
     
    </div>
  );
};

export default Registerform;
