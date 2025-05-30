import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './marketing.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Chart from 'chart.js/auto';

import bestcoupon from './bestcoupon.jpeg';
import affiliate from './affiliate.jpeg';
import social from './social.jpeg';
import email from './a.jpeg';
import paid from './paid.jpeg';
import seo from './seo.jpeg';



function Marketing() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const chartRefs = useRef({});

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

    const openModal = (modalId) => {
        setActiveModal(modalId);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    useEffect(() => {
        if (activeModal) {
            setTimeout(() => {
                drawCharts(activeModal);
            }, 500);
        }
    }, [activeModal]);

    const drawCharts = (modalId) => {
        const lineChartCanvas = document.getElementById(`${modalId}-lineChart`);
        const doughnutChartCanvas = document.getElementById(`${modalId}-doughnutChart`);
        
        if (!lineChartCanvas || !doughnutChartCanvas) return;
        
        if (chartRefs.current[`${modalId}-line`]) {
            chartRefs.current[`${modalId}-line`].destroy();
        }
        if (chartRefs.current[`${modalId}-doughnut`]) {
            chartRefs.current[`${modalId}-doughnut`].destroy();
        }

        chartRefs.current[`${modalId}-line`] = new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Monthly Performance',
                    data: Array.from({length: 12}, () => Math.floor(Math.random() * 100) + 20),
                    borderColor: 'blue',
                    borderWidth: 2,
                    fill: false
                }]
            }
        });

        chartRefs.current[`${modalId}-doughnut`] = new Chart(doughnutChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Organic', 'Paid', 'Referral', 'Direct'],
                datasets: [{
                    data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                    backgroundColor: ['#ADD8E6', '#FFB6C1', '#98FB98', '#FFD700']
                }]
            }
        });
    };

    const renderModal = () => {
        if (!activeModal) return null;

        return (
            <div className="modal-box" style={{ display: 'flex' }}>
                <div className="modal-content-box">
                    <span className="close-btn" onClick={closeModal}>&times;</span>
                    <h3 className="char-ui">{activeModal.replace('-box', '').replace('-', ' ').toUpperCase()}</h3>
                    <div className="chart-box">
                        <canvas id={`${activeModal}-lineChart`}></canvas>
                        <canvas id={`${activeModal}-doughnutChart`}></canvas>
                    </div>
                </div>
            </div>
        );
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
                    

                    <div className="width-set">
                        <div className="style-iop">
                            <div className="contai-sect1">
                                <div className="ing_uie">
                                    <h2 className="inv_mana">Marketing & Promotions</h2>
                                </div>

                                <div className="marking_tyu">
                                    <div className="mark_uip">
                                        <div className="contai-sect2" id="promotions">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={bestcoupon} alt="Promotions" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">Promotions & Discounts</h3>
                                                    <p className="create-mana">Create and manage special offers and discount programs.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('promotions-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="contai-sect2" id="affiliates">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={affiliate} alt="Affiliates" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">Affiliate Marketing</h3>
                                                    <p className="create-mana">Expand your reach through affiliate partnerships.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('affiliates-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="contai-sect2" id="social">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={social} alt="Social Media" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">Social Media Marketing</h3>
                                                    <p className="create-mana">Boost engagement through social media promotions.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('social-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="contai-sect2" id="email">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={email} alt="Email Marketing" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">Email Marketing</h3>
                                                    <p className="create-mana">Engage customers through personalized email campaigns.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('email-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="contai-sect2" id="ads">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={paid} alt="Paid Ads" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">Paid Advertisements</h3>
                                                    <p className="create-mana">Increase visibility with targeted ad placements.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('ads-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="contai-sect2" id="seo">
                                            <div className="img_flex">
                                                <div className="image_ropm">
                                                    <img className="text_imgty" src={seo} alt="SEO" />
                                                </div>
                                                <div className="matter-prop">
                                                    <h3 className="pro_dis">SEO Optimization</h3>
                                                    <p className="create-mana">Enhance your search engine rankings with effective SEO strategies.</p>
                                                    <div className="flex_div_but">
                                                        <button className="graph_btn-uy" onClick={() => openModal('seo-box')}>View More</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderModal()}
                </main>
            </div>
        </div>
    );
}

export default Marketing; 