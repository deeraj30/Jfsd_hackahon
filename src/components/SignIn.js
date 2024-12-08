import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                const { name, role } = result; // Assuming result contains user data
                localStorage.setItem('userDetails', JSON.stringify({ name, email, role }));
                
                // Redirect based on role
                if (role === 'teacher') {
                    navigate('/teacherhome');
                } else if (role === 'student') {
                    navigate('/studenthome');
                }
            } else {
                alert(result.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="signin-container">
            <div className="form-box">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="signin-btn">Sign In</button>
                </form>
                <p className="redirect-text">
                    Don't have an account? <a href="/signup">Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
