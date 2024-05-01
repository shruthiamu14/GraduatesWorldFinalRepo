
import FormInput from "./Forminput";
import { useState } from "react";
import '../css/RegistrationForm.css';
import { Link,useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage:
                "Invalid",
            label: "Email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
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
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      
          if (response.ok) {
            console.log('Login successful');
            navigate("/userdashboard");
            
            // Optionally, redirect the user or perform other actions upon successful login
          } else {
            const data = await response.json();
            setError(data.error || 'Failed to login');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Failed to login');
        }
      };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="registerapp">
            <form onSubmit={handleSubmit} className="rgform">
                <h1 className="rgformheading">User-Login</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                {error && <p className="error-message">{"Wrong Credentials"}</p>}
                <br />
                                <p className="rgformforgot">Forgot Password?<Link to='/r'>Click</Link></p>
                                <br />
                <p className="rgformforgot">Don't have an account?<Link to='/register'>Register</Link></p>

                <button className="rgsubmit">Submit</button>
            </form>
        </div>
    );
};

export default UserLogin;