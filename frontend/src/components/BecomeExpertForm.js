
import FormInput from "./Forminput";
import { useState } from "react";
import '../css/RegistrationForm.css';
import { Link,useNavigate } from "react-router-dom";
const BecomeExpertForm = () => {
    const [values, setValues] = useState({
      email: "",
      username: "",
      phonenumber:"",
      experience:"",
    });
    const navigate = useNavigate();
    const inputs = [
      {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage:
          "Invalid Email",
        label: "Email",
        pattern:  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        required: true,
      },
      {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Fullname",
        label: "Fullname",
        required: true,
      },
      {
        id: 3,
        name: "phonenumber",
        type:"tel",
        placeholder: "Phone Number",
        errorMessage: "It should be a valid phone number!",
        label:"Phone-Number",
        required:true
      },
    
      {
        id:4,
        name:"experience",
        type:"Number",
        placeholder:"Experience",
        errorMessage: "It should be between 0 and 25",
        label:"Experience",
        require:true,
        min:0,
        max:25
      
      },
      
      {
        id: 5,
        name: "resume",
        type: "file",
        placeholder: "Upload Resume",
        errorMessage: "It should be a valid file!",
        label: "Resume",
      },
      
    ];
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/expertRegister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
    
        if (response.ok) {
          console.log('Registration successful');
          navigate('/thankyou')
          // Optionally, redirect the user or perform other actions upon successful login
        } else {
          console.error('Failed to Register');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="registerapp">
        <form onSubmit={handleSubmit} className="rgform">
          <h1 className="rgformheading">Become An Expert</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <p className="rgformforgot">Already have an account?<Link to='/expertlogin'>Sign-in</Link></p>
          <button className="rgsubmit">Submit</button>
        </form>
      </div>
    );
  };

  export default BecomeExpertForm;
