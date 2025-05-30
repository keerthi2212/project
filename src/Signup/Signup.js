import React, { useState } from 'react';
import './Signup.css';

import signupimage from './an-signup-preview.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Real-time validation functions
    const validateUsername = (username) => {
        const usernameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
        if (!username) return "Username is required";
        if (!usernameRegex.test(username)) return "Username can only contain letters and single spaces";
        if (username.endsWith('.')) return "Username cannot end with a period";
        if (username.includes('  ')) return "Multiple spaces are not allowed";
        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number";
        if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
        return "";
    };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate username
        if (name === 'username') {
            setErrors(prev => ({
                ...prev,
                username: validateUsername(value)
            }));
        }

        // Validate email
        if (name === 'email') {
            const emailError = validateEmail(value);
            if (!emailError) {
                try {
                    const response = await fetch('/api/check-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: value })
                    });
                    const data = await response.json();
                    if (!data.available) {
                        setErrors(prev => ({
                            ...prev,
                            email: "Email already exists"
                        }));
                        return;
                    }
                } catch (err) {
                    console.error('Error checking email:', err);
                }
            }
            setErrors(prev => ({
                ...prev,
                email: emailError
            }));
        }

        // Validate password
        if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }

        // Validate confirm password
        if (name === 'confirmPassword') {
            setErrors(prev => ({
                ...prev,
                confirmPassword: value !== formData.password ? "Passwords do not match" : ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = formData.confirmPassword !== formData.password ? "Passwords do not match" : "";

        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        // If any errors exist, don't submit
        if (usernameError || emailError || passwordError || confirmPasswordError) {
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Signup successful!");
                window.location.href = "/login";
            } else {
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container-sign">
            <div className='container'>
            <div className="image-section">
                <img className="image-signup" src={signupimage} alt="Signup Illustration" />
            </div>
            
            <div className="form-section">
                <h2 className='sing' >Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                          className='username-sign'
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="error-message-sign">{errors.username}</div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                        className='email-sign'
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="error-message-sign">{errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        className='password-sign'
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="error-message-sign">{errors.password}</div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                        className='con-password-sign'
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="error-message-sign">{errors.confirmPassword}</div>
                    </div>
                    <button type="submit" className="btn-sign">Register</button>
                </form>
                <div className="signin-link">
                    Already have an account? <a href="/login">Sign In</a>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Signup;