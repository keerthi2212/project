import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Sales.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Chart from 'chart.js/auto';

function Sales() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2025');
    
    const salesChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const monthSalesChartRef = useRef(null);

    const salesData = { 
        "2022": [1700, 1200, 1130, 1920, 1059, 1922],
        "2023": [1400, 1600, 1500, 1000, 1000, 1530],
        "2024": [1600, 1800, 1300, 1750, 1220, 1050],
        "2025": [16, 18, 13, 15, 11, 13]
    };

    const salepieData = { 
        "2022": [52, 18, 22, 60, 55, 42],
        "2023": [30, 40, 15, 28, 20, 35],
        "2024": [15, 22, 68, 50, 62, 20],
        "2025": [6, 3, 5, 9, 8, 2],
    };

    const salesMonthlyData = {
        "2021": [1335, 1549, 1404, 1705, 1680, 1890, 1600, 1800, 1550, 1700, 1800, 1900],
        "2022": [1700, 1200, 1130, 1392, 1895, 1392, 1400, 1530, 1600, 1500, 1650, 1700],
        "2023": [1400, 1600, 1500, 1800, 1400, 1530, 1700, 1800, 1600, 1800, 1750, 1600],
        "2024": [1600, 1800, 1300, 1750, 1220, 1300, 1600, 1550, 1450, 1600, 1780, 1900],
        "2025": [1650, 1700, null, null, null, null, null, null, null, null, null, null]
    };

    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const colors = Array(6).fill('#004D99');
    const colorsPie = ['#fc6e51', '#f7b7a3', '#ea5f89', '#a0d468', '#ac92ec', '#ffce54'];

    useEffect(() => {
        // Initialize charts
        const salesCtx = salesChartRef.current.getContext('2d');
        const pieCtx = pieChartRef.current.getContext('2d');
        const monthSalesCtx = monthSalesChartRef.current.getContext('2d');

        const salesChart = new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['Curd', 'Milk', 'Paneer', 'Buttermilk', 'yogurt', 'cheese'],
                datasets: [{
                    label: 'Sales Data',
                    data: salesData[selectedYear],
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Arial',
                                weight: 'bold'
                            },
                            color: '#000',
                            padding: 20,
                            boxWidth: 20
                        }
                    }
                }
            }
        });

        const pieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Curd', 'Milk', 'Paneer', 'Buttermilk', 'yogurt', 'cheese'],
                datasets: [{
                    label: 'Sales',
                    data: salepieData[selectedYear],
                    backgroundColor: colorsPie
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Arial',
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        const monthSalesChart = new Chart(monthSalesCtx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'Monthly Sales (L/Kg)',
                    data: salesMonthlyData[selectedYear].map(x => x !== null ? x : undefined),
                    borderColor: '#004D99',
                    backgroundColor: '#004D99',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Arial',
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });

        // Cleanup function
        return () => {
            salesChart.destroy();
            pieChart.destroy();
            monthSalesChart.destroy();
        };
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

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
                    <div className="orders-header">
                        <div className="poli-wif">
                            <h1 className="name_ty">Sales</h1>
                        </div>
                    </div>

                    <div className="flextag">
                        <div className="Flexsel">
                            <div className='flex-sell'>
                                <div className="select-sales">
                                    <label className="Selecty">Select Year:</label>
                                    <select className='select-year' value={selectedYear} onChange={handleYearChange}>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                                <div className="flexsa">
                                    <div className="Graphdot-sales">
                                        <canvas ref={monthSalesChartRef}></canvas>
                                    </div>
                                    <div className="Pie-sales">
                                        {/* <p className="chart-title">Products Data</p> */}
                                        <canvas ref={pieChartRef}></canvas>
                                    </div>
                                    
                                    <div className="Graphdet-sales">
                                        <canvas ref={salesChartRef}></canvas>
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

export default Sales;