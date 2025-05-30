import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Loginimg from './loginimg-preview.png';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4040/api/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                // Store user data in localStorage
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('userEmail', response.data.user.email);
                
                // Show success message
                alert('Login successful!');
                
                // Redirect to home page
                navigate('/dashboard');
            } else {
                setErrors({ submit: response.data.message });
            }
        } catch (error) {
            setErrors({ 
                submit: error.response?.data?.message || 'Invalid email or password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="cube-d">
                <div className="run-hex">
                    <div className="cube_hex">
                    </div>
                </div>
            </div>
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} id="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                id="form-email" 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                placeholder="Enter Email"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                id="form-password" 
                                type="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                                pattern=".{6,}" 
                                title="Password must be at least 6 characters long" 
                                placeholder="Enter Password"
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="forgot-password">
                            <a className="frog" href="/forgot-password">Forgot Password?</a>
                        </div>

                        {errors.submit && <div className="error">{errors.submit}</div>}
                        
                        <button 
                            id="submit-button" 
                            type="submit" 
                            className="btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div className="signup-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </div>
                </div>
                <div className="image-box">
                    <img className="img-a" src={Loginimg} alt="Login Illustration" />
                </div>
            </div>
        </div>
    );
}

export default Login;