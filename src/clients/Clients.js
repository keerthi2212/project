import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Clients.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import heritage from './heritage.jpeg';
import farm from './farm.jpeg';
import freshdairy from './freshdairy.jpeg';
import Milkstock from './milkstock.jpeg';
import amul from './amul.jpeg';
//import prabhat from './prabhat.jpeg';


function Clients() {
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
                    <img className="img_wh" src={logo1} alt="Profile Picture" />
                    <div className="span_U"><span id="usernames">Sahithi</span></div>
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

                    <div className="Clients-html">
                        <div className="Client-or">
                            <div className="Client-Rt">
                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src="https://viver-myexlusive-server.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2024/11/14120545/2-1.png" alt="Mother Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Mother Dairy</h1>
                                            </div>
                                            <p className="Warangal">Warangal Sales</p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 22,00,000</span></p>
                                            <p className="decrease">3.2% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src={heritage} alt="Heritage Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Heritage Dairy</h1>
                                            </div>
                                            <p className="Warangal">Nizambad Sales</p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 19,00,000</span></p>
                                            <p className="decrease -brown">1.2% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src={freshdairy} alt="Fresh Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Fresh Dairy</h1>
                                            </div>
                                            <p className="Warangal">Nirmal Sales</p>
                                            <p className="Branch">Branch - <span className="BB-k">18</span></p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 19,00,000</span></p>
                                            <p className="decrease -red">2.3% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src={Milkstock} alt="Milkstock Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Milkstock Dairy</h1>
                                            </div>
                                            <p className="Warangal">Medchal Sales</p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 19,00,000</span></p>
                                            <p className="decrease">3% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src={farm} alt="Farm Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Farm Dairy</h1>
                                            </div>
                                            <p className="Warangal">Rangareddy Sales</p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 19,00,000</span></p>
                                            <p className="decrease">5.62% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="Clients-k">
                                    <div className="clients-img">
                                        <div className="img-i">
                                            <img className="img-client" src={amul} alt="Amul Dairy" />
                                        </div>
                                        <div className="matter-i">
                                            <div className="matter-h">
                                                <h1 className="Mother-da">Amul Dairy</h1>
                                            </div>
                                            <p className="Warangal">Adilabad Sales</p>
                                            <p className="Branch">Revenue : <span className="B-k"><i className="fa fa-rupee"></i> 19,00,000</span></p>
                                            <p className="decrease">8% Sales Increase</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Clients; 