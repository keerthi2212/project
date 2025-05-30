import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './customer-review.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Chart from 'chart.js/auto';

function CustomerReview() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const chartRef = useRef(null);

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

    useEffect(() => {
        const ctx = document.getElementById('feedbackChart')?.getContext('2d');
        if (ctx) {
            const feedbackData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Positive',
                    data: [300, 250, 40, null, null, null, null, null, null, null, null, null],
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
                },
                {
                    label: 'Negative',
                    data: [150, 130, 20, null, null, null, null, null, null, null, null, null],
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                }]
            };

            const feedbackOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            };

            const chart = new Chart(ctx, {
                type: 'bar',
                data: feedbackData,
                options: feedbackOptions
            });

            chartRef.current = chart;

            // Update feedback count dynamically
            document.getElementById('goodFeedbackCount').textContent = feedbackData.datasets[0].data[0];
            document.getElementById('badFeedbackCount').textContent = feedbackData.datasets[1].data[0];

            return () => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
            };
        }
    }, []);

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

                <main className={`orders-container ${isSidebarOpen ? 'sideba-revr-open' : ''}`}>
                    <div className="dashboard">
                        <div className="feedback-analysis">
                            <div className="Widht_plo">
                                <div className="poli-wif">
                                    <h1 className="name_ty">Customer Feedback</h1>
                                </div>
                            </div>
                            <div className="charts">
                                <div className="chart-container">
                                    <h3>Feedback Analysis</h3>
                                    <canvas id="feedbackChart" style={{ width: '100%', maxWidth: '500px', height: '400px', maxHeight: '350px', marginTop: '20px' }}></canvas>
                                </div>
                                <div className="feedback-summary">
                                    <div className="box green">
                                        <div className="fa_icon">
                                            <i id="comments" className="fa fa-comments" aria-hidden="true"></i>
                                        </div>
                                        <div className="matter-li">
                                            <h2 className="goo">Positive</h2>
                                            <p id="goodFeedbackCount" className="gtu">300</p>
                                        </div>
                                    </div>
                                    <div className="box red">
                                        <div className="fa_icon">
                                            <i id="comments" className="fa fa-comments" aria-hidden="true"></i>
                                        </div>
                                        <div className="rem_metter">
                                            <h2 className="goo">Negative</h2>
                                            <p id="badFeedbackCount" className="tyo">50</p>
                                        </div>
                                    </div>
                                    <div className="box full_box">
                                        <div className="img-src">
                                            <div className="imh">
                                                <img className="img-rt" src="https://5.imimg.com/data5/SELLER/Default/2021/6/EU/VK/EB/10100178/pasteurized-market-milk-1000x1000.jpg" alt="Milk Product" />
                                            </div>
                                            <div className="matter">
                                                <div className="matter-jki">
                                                    <div className="hui_rt">
                                                        <h3 className="mikl">Great Milk Product</h3>
                                                        <p className="stars">
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </p>
                                                    </div>
                                                    <p className="cu-t">Everything from milk, lassi, ghee, butter, panner available at competitive prices with good quality. Hygeine is taken care of very specifically.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box full_box">
                                        <div className="img-src">
                                            <div className="imh">
                                                <img className="img-rt" src="https://images.news18.com/ibnlive/uploads/2024/06/nandini-milk-price-hike-2024-06-77cfb4712efa1654d45358b444cacd29-16x9.jpg?impolicy=website&width=640&height=360" alt="Milk Product" />
                                            </div>
                                            <div className="matter">
                                                <div className="matter-jki">
                                                    <div className="hui_rt">
                                                        <h3 className="mikl">Disappointed with the Quality</h3>
                                                        <p className="stars">
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i id="star" className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </p>
                                                    </div>
                                                    <p className="cu-t">I recently tried this milk and I have to say I'm really disappointed. The milk had an odd aftertaste and didn't feel as fresh as it should be.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cu-s">
                            <div className="ticket-form">
                                <h2 className="huy">Submit a Support Ticket</h2>
                                <form id="ticketForm">
                                    <label htmlFor="name">Product Id:</label>
                                    <input type="text" id="name" required />
                    
                                    <label htmlFor="email">Your Email:</label>
                                    <input type="email" id="email" required />
                    
                                    <label htmlFor="issue">Issue Description:</label>
                                    <textarea id="issue" rows="4" required></textarea>
                    
                                    <button type="submit">Submit Ticket</button>
                                </form>
                                <p id="formMessage"></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CustomerReview; 