
import FormInput from "./Forminput";
import { useState } from "react";
import '../css/RegistrationForm.css';
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "text",
            placeholder: "Email",
            errorMessage:
                "Invalid Email",
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
          const response = await fetch('https://graduatesworldfinalrepo.onrender.com/api/adminlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      
          if (response.ok) {
            console.log('Login successfull');
            navigate("/admindashboard")
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
                <h1 className="rgformheading">Admin-Login</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}

                <button className="rgsubmit">Submit</button>
            </form>
        </div>
    );
};

export default AdminLogin;
