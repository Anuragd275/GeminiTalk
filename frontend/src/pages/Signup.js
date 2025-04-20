import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://geminitalk-uy05.onrender.com/signup', {
                user_email: email,
                password: password
            });
            setMessage('Signup successful!');
            console.log(response.data);

            setTimeout(() => {
                navigate("/chat");
            }, 1500);

        } catch (error) {
            setMessage('Signup failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type='submit' value='Signup' />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;
