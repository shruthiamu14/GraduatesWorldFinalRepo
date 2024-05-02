
import FormInput from "./Forminput";
import { useState } from "react";
import '../css/RegistrationForm.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
const ExpertLogin = () => {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage:
                "Invalid Email",
            label: "Email",
            pattern:  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
            required: true,
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-15 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$`,
            required: true,
        },

    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/expertlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      
          if (response.ok) {
            console.log('Expert Login successful');
            navigate("/expertdashboard");
            
            // Optionally, redirect the user or perform other actions upon successful login
          } else {
            console.error('Failed to login');
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
                <h1 className="rgformheading">Expert-Login</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <p className="rgformforgot">Forgot Password?<Link to='/expertforgot'>Click</Link></p>

                <button className="rgsubmit" >Submit</button>
            </form>
        </div>
    );
};

export default ExpertLogin;
