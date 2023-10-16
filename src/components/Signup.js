import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            email: email,
            password: password,
            cpassword:cpassword
        };

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) // Pass 'data' directly without wrapping it in an object

        });
        const json = await response.json();
        console.log("Signup -- ", json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/login'); // Use navigate to redirect to the Login page
            props.showAlert("Acount Created Successfully ","success");

        } else {
            props.showAlert("Invalid Credetials","danger");
        }
    }

    const onChangename = (e) => {
        setName(e.target.value);
    }
    const onChangeemail = (e) => {
        setEmail(e.target.value); 
    }
    const onChangepassword = (e) => {
        setPassword(e.target.value); 
    }
    const onChangecpassword = (e) => {
        setCPassword(e.target.value); 
    }

    return (
        <div className='mt-2'>
        <h2 className='my-2'>Create an accout to use to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='uname' id="name" aria-describedby="emailHelp" onChange={onChangename} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='uemail' id="email" aria-describedby="emailHelp" onChange={onChangeemail} />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='upassword' id="password" onChange={onChangepassword} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                    <input type="password" className="form-control" name='ucpassword' id="cpassword" onChange={onChangecpassword} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup;
