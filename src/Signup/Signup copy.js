import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
//import signupImage from '../../assets/signup-image.png';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: ''
    });

    useEffect(() => {
        // Calculate password strength
        if (formData.password) {
            let score = 0;
            let message = '';

            // Length check
            if (formData.password.length >= 8) score += 1;
            
            // Uppercase check
            if (/[A-Z]/.test(formData.password)) score += 1;
            
            // Number check
            if (/\d/.test(formData.password)) score += 1;
            
            // Special character check
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) score += 1;

            // Set message based on score
            switch(score) {
                case 0:
                    message = 'Very Weak';
                    break;
                case 1:
                    message = 'Weak';
                    break;
                case 2:
                    message = 'Medium';
                    break;
                case 3:
                    message = 'Strong';
                    break;
                case 4:
                    message = 'Very Strong';
                    break;
                default:
                    message = '';
            }

            setPasswordStrength({ score, message });
        } else {
            setPasswordStrength({ score: 0, message: '' });
        }
    }, [formData.password]);

    const validateForm = () => {
        const newErrors = {};
        
        // Username validation
        const usernameRegex = /^(?![.\s])([A-Za-z]+[.]?(\s[A-Za-z]+){0,4})?$/;
        const periodCount = (formData.username.match(/[.]/g) || []).length;
        const spaceCount = (formData.username.match(/ /g) || []).length;

        if (!usernameRegex.test(formData.username) || 
            periodCount > 2 || 
            spaceCount > 4 || 
            formData.username.includes(" .") || 
            formData.username.includes(". ")) {
            newErrors.username = "Invalid username format";
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character";
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
            const response = await axios.post('http://localhost:4040/api/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                setErrors({ submit: response.data.message });
            }
        } catch (error) {
            setErrors({ 
                submit: error.response?.data?.message || 'An error occurred during signup'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className="signup-image-section">
                <img src='' alt="Signup" className="signup-image" />
                {/* <img src={signupImage} alt="Signup" className="signup-image" /> */}
                    <div className="image-overlay">
                        <h2 className='welcome-s' >Welcome to Dairy Shop</h2>
                        <p>Join our community of dairy lovers</p>
                    </div>
                </div>
                
                <div className="signup-form-section">
                    <div className="form-header">
                        <h1>Create Account</h1>
                        <p>Start your dairy journey with us</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <div className="input-wrapper">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>

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
                                    placeholder="Create password"
                                    required
                                />
                            </div>
                            {formData.password && (
                                <div className="password-strength">
                                    <div className={`strength-bar strength-${passwordStrength.score}`}></div>
                                    <span className="strength-message">{passwordStrength.message}</span>
                                </div>
                            )}
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
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
                                'Create Account'
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

                    <div className="login-link">
                        Already have an account? 
                        <a href="/login">Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;