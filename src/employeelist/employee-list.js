import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './employee-list.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Chart from 'chart.js/auto';

function EmployeeList() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        status: '',
        month: ''
    });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('employeeData')) || [];
        setEmployeeData(savedData);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            updateChart();
        }
    }, [employeeData]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]+[a-zA-Z]*$/;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const validateAddress = (address) => {
        return address.trim().length > 0;
    };

    const validateStatus = (status) => {
        return status !== "";
    };

    const validateMonth = (month) => {
        return month !== "";
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Real-time validation
        let error = '';
        switch(id) {
            case 'name':
                if (!validateName(value)) {
                    error = 'Name should not contain spaces or end with a dot';
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'mobile':
                if (!validateMobile(value)) {
                    error = 'Please enter a valid 10-digit mobile number';
                }
                break;
            case 'address':
                if (!validateAddress(value)) {
                    error = 'Address is required';
                }
                break;
            case 'status':
                if (!validateStatus(value)) {
                    error = 'Please select a status';
                }
                break;
            case 'month':
                if (!validateMonth(value)) {
                    error = 'Please select a month';
                }
                break;
            default:
                break;
        }
        setErrors(prev => ({
            ...prev,
            [id]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        // Validate all fields
        if (!validateName(formData.name)) {
            newErrors.name = 'Name should not contain spaces or end with a dot';
            isValid = false;
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
        if (!validateMobile(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        }
        if (!validateAddress(formData.address)) {
            newErrors.address = 'Address is required';
            isValid = false;
        }
        if (!validateStatus(formData.status)) {
            newErrors.status = 'Please select a status';
            isValid = false;
        }
        if (!validateMonth(formData.month)) {
            newErrors.month = 'Please select a month';
            isValid = false;
        }

        if (isValid) {
            const newEmployeeData = [...employeeData];
            if (editingIndex === -1) {
                newEmployeeData.push(formData);
            } else {
                newEmployeeData[editingIndex] = formData;
            }
            setEmployeeData(newEmployeeData);
            localStorage.setItem('employeeData', JSON.stringify(newEmployeeData));
            setIsModalOpen(false);
            setFormData({
                name: '',
                email: '',
                mobile: '',
                address: '',
                status: '',
                month: ''
            });
            setEditingIndex(-1);
        } else {
            setErrors(newErrors);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(employeeData[index]);
        setIsModalOpen(true);
    };

    const handleAddEmployee = () => {
        setEditingIndex(-1);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            address: '',
            status: '',
            month: ''
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingIndex(-1);
        setFormData({
            name: '',
            email: '',
            mobile: '',
            address: '',
            status: '',
            month: ''
        });
        setErrors({});
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            const newEmployeeData = employeeData.filter((_, i) => i !== index);
            setEmployeeData(newEmployeeData);
            localStorage.setItem('employeeData', JSON.stringify(newEmployeeData));
        }
    };

    const updateChart = () => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const months = [...new Set(employeeData.map(emp => emp.month))].sort();
        const presentCount = months.map(month => 
            employeeData.filter(emp => emp.month === month && emp.status === 'Present').length
        );
        const leftCount = months.map(month => 
            employeeData.filter(emp => emp.month === month && emp.status === 'Left').length
        );

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Present Employees',
                        data: presentCount,
                        backgroundColor: '#4CAF50',
                        borderWidth: 1,
                    },
                    {
                        label: 'Employees Left',
                        data: leftCount,
                        backgroundColor: '#f44336',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'nearest',
                    intersect: false,
                    axis: 'x'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            min: 0,
                        },
                    },
                },
            },
        });
    };

    return (
        <div className="dashboard-wrapper">
            <header>
                <div className="logo">
                    <img src={logo} height="100" width="300" alt="Company Logo" />
                    <div className="search-bar">
                        <input type="search" placeholder="Search dairy products..." />
                        <i id="serch" className="fa fa-search"></i>
                    </div>
                </div>
                
                <div className="profile">
                    <div className="notification-container">
                        <div className="notification-icon" onClick={toggleNotification}>
                            <i className="fa fa-bell" aria-hidden="true"></i>
                            <span className="notification-dot"></span>
                        </div>
                        <div className={`notification-dropdown ${isNotificationOpen ? 'show' : ''}`}>
                            <h4>Notifications</h4>
                            <ul>
                                <li>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" alt="Order Icon" />
                                    <div>
                                        <strong>New order received</strong>
                                        <p>Your dairy order has been confirmed</p>
                                        <span>24 min ago</span>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="Message Icon" />
                                    <div>
                                        <strong>New inquiry</strong>
                                        <p>Customer question about product details</p>
                                        <span>1 hr ago</span>
                                    </div>
                                </li>
                                <li>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1150/1150645.png" alt="Review Icon" />
                                    <div>
                                        <strong>New review posted</strong>
                                        <p>See the latest customer feedback</p>
                                        <span>4 days ago</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img className="img_wh" src={logo1} alt="Profile Picture" />
                    <div className="span_U"><span id="usernames">Sahithi</span></div>
                    <div className="menu-toggle" onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>

            <div className="dashboard-container">
                <div className={`aside-class ${isSidebarOpen ? 'active' : ''}`}>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        <li><Link to="/clients">Clients</Link></li>
                        <li><Link to="/sales">Sales</Link></li>
                        <li><Link to="/analysis">Product Analysis</Link></li>
                        <li><Link to="/reviews">Customer Review</Link></li>
                        <li><Link to="/employees">Employee List</Link></li>
                        <li><Link to="/marketing">Marketing</Link></li>
                        <li className="logout" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>

                <main className={`orders-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="container_hyu">
                        <div className="containe_ghy">
                            <div className="Widht_plo">
                                <div className="poli-wif">
                                    <h1 className="name_ty">Employee History</h1>
                                </div>
                            </div>
                            <div className="btn-cl">
                                <div className="bth_oip">
                                    <button className="juki" onClick={handleAddEmployee}>Add Employee</button>
                                </div>
                                <div className="Oip_ert">
                                    <input type="search" className='searhg' placeholder="Search..." />
                                </div>
                            </div>

                            <table id="employeeTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile No</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th>Month</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeData.map((employee, index) => (
                                        <tr key={index}>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.mobile}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.status}</td>
                                            <td>{employee.month}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="canbv">
                                <div className="canb">
                                    <canvas ref={chartRef}></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="modal" style={{ display: 'block' }}>
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <h2 className='edit-ad' >{editingIndex === -1 ? 'Add Employee' : 'Edit Employee'}</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={errors.name ? 'error' : 'emp-name'}
                                            required
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={errors.email ? 'error' : 'emp-email'}
                                            required
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile">Mobile No:</label>
                                        <input
                                            type="text"
                                            id="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className={errors.mobile ? 'error' : 'emp-mobile'}
                                            required
                                        />
                                        {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        <input
                                            type="text"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={errors.address ? 'error' : 'emp-address'}
                                            required
                                        />
                                        {errors.address && <span className="error-message">{errors.address}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status:</label>
                                        <select
                                            id="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className={errors.status ? 'error' : 'selecttagu'}
                                            required
                                        >
                                            <option value="0" default >Select Status</option>
                                            <option value="Present">Present</option>
                                            <option value="Left">Left</option>
                                        </select>
                                        {errors.status && <span className="error-message">{errors.status}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="month">Month:</label>
                                        <input
                                            type="month"
                                            id="month"
                                            value={formData.month}
                                            onChange={handleInputChange}
                                            className={errors.month ? 'error' : 'emp-month'}
                                            required
                                        />
                                        {errors.month && <span className="error-message">{errors.month}</span>}
                                    </div>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default EmployeeList;