import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

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
            <div className="login-container">
                <div className="login-image-section">
                    <img src='' alt="Login" className="login-image" />
                    <div className="image-overlay">
                        <h2>Welcome Back!</h2>
                        <p>Sign in to continue your dairy journey</p>
                    </div>
                </div>
                
                <div className="login-form-section">
                    <div className="form-header">
                        <h1>Sign In</h1>
                        <p>Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <div className="input-wrapper">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span className='rem' >Remember me</span>
                            </label>
                            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                        </div>

                        {errors.submit && <div className="error-message">{errors.submit}</div>}

                        <button 
                            type="submit" 
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loader"></span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="divider">
                        <span>or continue with</span>
                    </div>

                    <div className="social-buttons">
                        <button className="social-button google">
                            <i className="fab fa-google"></i>
                            <span>Google</span>
                        </button>
                        <button className="social-button facebook">
                            <i className="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </button>
                    </div>

                    <div className="signup-link">
                        Don't have an account? 
                        <a href="/signup">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
