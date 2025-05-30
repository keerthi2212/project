import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Clients.css';
import logo from '../home/Logo.png';

function Sales() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
                        <div className="notification-icon" id="notification-btn" onClick={toggleNotification}>
                            <i id="fa_bell" className="fa fa-bell" aria-hidden="true"></i>
                            <span className="notification-dot" id="notification-dot"></span>
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
                    <img className="img_wh" src="WhatsApp Image 2025-02-19 at 18.00.09.jpeg" alt="Profile Picture" />
                    <div className="span_U"><span>User</span></div>
                    <div className="menu-toggle" id="menu-toggle" onClick={toggleSidebar}>
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
                    <div className="orders-header">
                        <div className="poli-wif">
                            <h1 className="name_ty">Clients</h1>
                        </div>
                    </div>
 
 

                </main>
            </div>
        </div>
    );
}

export default Sales; 