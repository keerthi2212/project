import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Link } from 'react-router-dom';
import './company.css';
import logo from './Logo.png';
import logo1 from './logo1.jpeg';



// Register Chart.js components
Chart.register(...registerables);

function Home() {
    const salesMonthChartRef = useRef(null);
    const salesPieChartRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    useEffect(() => {
        // Initialize charts after component mounts
        const salesMonthlyData = {
            "2025": [1130, 1200, 150, null, null, null, null, null, null, null, null, null]
        };

        const salepieData = {
            "2025": [500, 200, 150, 120, 300, 250]
        };

        const colorsPie = [
            'orange', 
            '#ddd', 
            'skyblue', 
            'green', 
            'gold', 
            'pink'
        ];

        // Monthly sales chart
        const ctxr = document.getElementById('salesmonthss')?.getContext('2d');
        if (ctxr) {
            // Destroy existing chart if it exists
            if (salesMonthChartRef.current) {
                salesMonthChartRef.current.destroy();
            }
            
            salesMonthChartRef.current = new Chart(ctxr, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Recent Sales',
                        data: salesMonthlyData["2025"],
                        borderColor: 'blue',
                        backgroundColor: '#ccc',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 18,
                                    family: 'Arial',
                                    weight: 'bold',
                                    style: 'italic'
                                },
                                color: '#000',
                                padding: 20,
                                boxWidth: 20
                            }
                        },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItem) {
                                    return tooltipItem[0].label;
                                },
                                label: function(tooltipItem) {
                                    const value = tooltipItem.raw;
                                    return `Sales: ${value}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Pie chart
        const ctxs = document.getElementById('salesPieGr')?.getContext('2d');
        if (ctxs) {
            // Destroy existing chart if it exists
            if (salesPieChartRef.current) {
                salesPieChartRef.current.destroy();
            }

            salesPieChartRef.current = new Chart(ctxs, {
                type: 'doughnut',
                data: {
                    labels: ['paneer', 'milk', 'buttermilk', 'ghee', 'curd', 'cheese'],
                    datasets: [{
                        label: 'Sales Data By Quantity (L/Kg)',
                        data: salepieData["2025"],
                        backgroundColor: colorsPie
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 18,
                                    family: 'Arial',
                                    weight: 'bold',
                                    style: 'italic'
                                },
                                color: '#000',
                                padding: 20,
                                boxWidth: 20
                            }
                        },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItem) {
                                    return tooltipItem[0].label;
                                },
                                label: function(tooltipItem) {
                                    const value = tooltipItem.raw;
                                    return `Sales: ${value}`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Username setup
        const username = document.getElementById('username');
        if (username) {
            const loggedInUser = localStorage.getItem('username');
            username.textContent = loggedInUser || '';
        }

        // Cleanup function
        return () => {
            // Destroy charts
            if (salesMonthChartRef.current) {
                salesMonthChartRef.current.destroy();
            }
            if (salesPieChartRef.current) {
                salesPieChartRef.current.destroy();
            }
        };
    }, []);

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
                        <li id="dashboard-link" className="active"><Link to="/dashboard">Dashboard</Link></li>
                        <li id="products-link"><Link to="/products">Products</Link></li>
                        <li id="Orders-link"><Link to="/orders">Orders</Link></li>
                        <li id="client-link"><Link to="/clients">Clients</Link></li>
                        <li id="Sales-link"><Link to="/sales">Sales</Link></li>
                        <li id="analysis-link"><Link to="/analysis">Product Analysis</Link></li>
                        <li id="Customer-Review"><Link to="/reviews">Customer Review</Link></li>
                        <li id="Employee-List"><Link to="/employees">Employee List</Link></li>
                        <li id="Marketing"><Link to="/marketing">Marketing</Link></li>
                        <li id="back-to-login" className="logout" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>

                <main className={isSidebarOpen ? 'sidebar-open' : ''}>
                    <div className="wid-io">
                        <div className="hj-name">
                            <h1 className="month-sal">Monthly Sales</h1>
                        </div>
                        <div className="wid-oip">
                            <div className="super-as">
                                <div className="super-ss">
                                    <div className="u-super">
                                        <div className="O-super-O">
                                            <div className="sup-fr">
                                                <p className="green-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf">Total Revenue</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"><i className="fa fa-rupee"></i> 20,00,000 </p>
                                                    <p className="rupe-cha-green"> 2.5%  <i className="fa fa-arrow-up"></i> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="O-super-R">
                                            <div className="sup-fr">
                                                <p className="red-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf">Invoices</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"> 2146 </p>
                                                    <p className="rupe-cha-red"> - 3.5%  <i className="fa fa-arrow-down"></i> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="O-super-G">
                                            <div className="sup-fr">
                                                <p className="blue-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf"><i id="user-uj" className="fa fa-user" aria-hidden="true"></i>Clients</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"> 1423 </p>
                                                    <p className="rupe-cha-blue"> 4.5%  <i className="fa fa-arrow-up"></i> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="O-super-Bl">
                                            <div className="sup-fr">
                                                <p className="br-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf"><i id="user-uj" className="fa fa-gear"></i>Services</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"> 78 </p>
                                                    <p className="rupe-cha-br"> 1.9%  <i className="fa fa-arrow-down"></i> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="O-super-OR">
                                            <div className="sup-fr">
                                                <p className="or-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf"><i id="user-uj" className="fa fa-bar-chart" aria-hidden="true"></i>Analysis</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"> 122 </p>
                                                    <p className="rupe-cha-OR"> 3.9%  <i className="fa fa-arrow-up"></i> </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="O-super-N">
                                            <div className="sup-fr">
                                                <p className="N-cricle"></p>
                                            </div>
                                            <div className="O-super">
                                                <h2 className="hu-tf"><i id="user-u" className="fa fa-bar-chart" aria-hidden="true"></i>Sales</h2>
                                                <div className="ju-d">
                                                    <p className="rupe-s"> 3000 </p>
                                                    <p className="rupe-cha-N"> 2.9%  <i className="fa fa-arrow-up"></i> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Graph-lo">
                                <div className="graph-jy">
                                    <div className="ht-graph">
                                        <h1 className="graph-li">Recent Sales</h1>
                                    </div>
                                    <div className="graph-jyi">
                                        <div className="grap-uyj">
                                            <div className="graph-ujy">
                                                <div className="Sales_u-monthly">
                                                    <canvas id="salesmonthss"></canvas>
                                                </div>
                                                <div className="don-t">
                                                    <canvas id="salesPieGr"></canvas>
                                                </div>
                                            </div>
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

export default Home;