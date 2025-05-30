import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './productanalysis.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Chart from 'chart.js/auto';

function Productanalysis() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2025');
    const chartsRef = useRef([]);

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

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Data objects
    const curd = { 
        "2022": [1335, 1549, 1404, 1705, 1680, 1890, 1600, 1800, 1550, 1700, 1850, 1900],
        "2023": [1450, 1550, 1250, 1700, 1600, 1500, 1800, 1350, 1650, 1550, 1450, 1600],
        "2024": [1600, 1700, 1250, 1750, 1680, 1800, 1650, 1550, 1600, 1500, 1750, 1850],
        "2025": [1700, 1300, 1250, 1400, 500, null, null, null, null, null, null, null]
    };

    const Milk = { 
        "2022": [1502, 1138, 1232, 1260, 1515, 1242, 1324, 1421, 1345, 1678, 1855, 1974],
        "2023": [1300, 1400, 1150, 1230, 1450, 1500, 1600, 1350, 1550, 1450, 1300, 1370],
        "2024": [1200, 1400, 1600, 1350, 1500, 1750, 1300, 1400, 1600, 1250, 1450, 1550],
        "2025": [1450, 1500, 1300, 1250, 700, null, null, null, null, null, null, null]
    };

    const Buttermilk = {
        "2022": [1700, 1200, 1130, 1392, 1895, 1392, 1400, 1530, 1600, 1500, 1650, 1700],
        "2023": [1600, 1700, 1500, 1250, 1550, 1800, 1400, 1600, 1750, 1800, 1450, 1300],
        "2024": [1600, 1800, 1300, 1750, 1220, 1300, 1600, 1550, 1450, 1600, 1780, 1900],
        "2025": [1750, 1800, 1500, 1600, 650, null, null, null, null, null, null, null]
    };

    const yoghurt = { 
        "2022": [1700, 1200, 1130, 1920, 1059, 1922, 1400, 1600, 1300, 1250, 1450, 1800],
        "2023": [1400, 1600, 1500, 1000, 1000, 1530, 1350, 1250, 1550, 1450, 1700, 1800],
        "2024": [1600, 1800, 1300, 1750, 1220, 1050, 1600, 1700, 1500, 1400, 1300, 1600],
        "2025": [1350, 1250, 1150, 1000, 350, null, null, null, null, null, null, null]
    };

    const cheese = { 
        "2022": [1152, 1028, 1322, 1660, 1955, 1242, 1390, 1689, 1987, 1789, 1678, 1898],
        "2023": [1330, 1410, 1915, 1828, 1220, 1435, 1789, 1879, 1567, 1356, 1879, 1246],
        "2024": [1590, 1222, 1268, 1150, 1962, 1420, 1789, 1235, 1678, 1987, 1816, 1678],
        "2025": [1150, 1550, 1400, 1250, 650, null, null, null, null, null, null, null]
    };

    const MilkPowder = {
        "2022": [1700, 1200, 1130, 1392, 1895, 1392, 1400, 1530, 1600, 1500, 1650, 1700],
        "2023": [1400, 1600, 1500, 1800, 1400, 1530, 1700, 1800, 1600, 1800, 1750, 1600],
        "2024": [1600, 1800, 1300, 1750, 1220, 1300, 1600, 1550, 1450, 1600, 1780, 1900],
        "2025": [1150, 1300, 700, 1000, 250, null, null, null, null, null, null, null]
    };

    const canvasIds = ['curd-sales', 'milk-sales', 'buttermilk-sales', 'yoghurt-sales', 'cheese-sales', 'milkpowder-sales'];
    const datasets = [curd, Milk, Buttermilk, yoghurt, cheese, MilkPowder];
    const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const colors = [
        '#ff5733',  // Red-Orange for curd
        '#031163',  // Green for milk
        '#1d7874',  // Blue for buttermilk
        '#7b1e7a',  // Pink for yoghurt
        '#88d6e3',  // Orange for cheese
        'orange',   // Light blue for milk powder
    ];

    useEffect(() => {
        // Initialize charts
        canvasIds.forEach((canvasId, index) => {
            const ctx = document.getElementById(canvasId)?.getContext('2d');
            if (ctx) {
                const chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: monthLabels,
                        datasets: [{
                            label: canvasId.split('-')[0],
                            data: datasets[index][selectedYear],
                            borderColor: colors[index],
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: "bottom" }
                        },
                        scales: {
                            x: { beginAtZero: true },
                            y: { beginAtZero: true }
                        }
                    }
                });
                chartsRef.current[index] = chart;
            }
        });

        // Cleanup function
        return () => {
            chartsRef.current.forEach(chart => {
                if (chart) {
                    chart.destroy();
                }
            });
        };
    }, []);

    useEffect(() => {
        // Update charts when year changes
        chartsRef.current.forEach((chart, index) => {
            if (chart) {
                chart.data.datasets[0].data = datasets[index][selectedYear];
                chart.update();
            }
        });
    }, [selectedYear]);

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
                    <div className="flextag">
                        <div className="Flexsel">
                            <div className="Widht_plo">
                                <div className="poli-wif">
                                    <h1 className="name_ty">Product Analysis</h1>
                                </div>
                            </div>
                            <div className="tab-p">
      <div className="tab-yu">
        
        {/* Curd */}
        <div className="curd-p">
          <div className="img-cu">
            <img
              className="img-po"
              src="https://www.shutterstock.com/image-vector/milk-food-bowl-curd-slice-260nw-2175972191.jpg"
              alt="Curd"
            />
          </div>
          <div className="div-pro">
            <h1 className="cur-but">Curd</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">12,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-po">
                2.9 <i className="fa fa-arrow-down" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Milk */}
        <div className="milk-p">
          <div className="img-cu">
            <img class="img-po" src="data:image/png;base64,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" />
            </div>
          <div className="div-pro">
            <h1 className="cur-but">Milk</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">20,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-milk">
                4.9 <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Butter Milk */}
        <div className="buttermilk-p">
          <div className="img-cu">
            <img
              className="img-po"
              src="https://us.123rf.com/450wm/juliarstudio/juliarstudio1603/juliarstudio160301408/53794757-bottle-of-milk-icon-in-cartoon-style-on-a-white-background.jpg?ver=6"
              alt="Butter Milk"
            />
          </div>
          <div className="div-pro">
            <h1 className="cur-but">Butter Milk</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">16,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-butter">
                1.9 <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Yogurt */}
        <div className="yoghurt-p">
          <div className="img-cu">
            <img
              className="img-po"
              src="https://cdn-icons-png.freepik.com/512/7615/7615362.png"
              alt="Yogurt"
            />
          </div>
          <div className="div-pro">
            <h1 className="cur-but">Yogurt</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">13,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-yoghurt">
                0.9 <i className="fa fa-arrow-down" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Cheese */}
        <div className="cheese-p">
          <div className="img-cu">
            <img
              className="img-po"
              src="https://cdn-icons-png.flaticon.com/512/604/604813.png"
              alt="Cheese"
            />
          </div>
          <div className="div-pro">
            <h1 className="cur-but">Cheese</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">9,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-cheese">
                3.9 <i className="fa fa-arrow-down" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

        {/* Milk Powder */}
        <div className="MilkPowder-p">
          <div className="img-cu">
            <img
              className="img-po"
              src="https://cdn-icons-png.flaticon.com/512/1520/1520991.png"
              alt="Milk Powder"
            />
          </div>
          <div className="div-pro">
            <h1 className="cur-but">Milk Powder</h1>
            <p className="rev">
              <span className="rev-pr">Revenue : </span>
              <span className="pro-revn">18,00,000</span>
            </p>
            <div className="right-side">
              <p className="in-milkpp">
                7.9 <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
                            <div className="selct-ty">
                                <div className="selectg">
                                    <label className="Selecty">Select Year:</label>
                                    <select className='select-anay' value={selectedYear} onChange={handleYearChange}>
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                            </div>
                            <div className="graph_rt">
                                {canvasIds.map((id, index) => (
                                    <div key={id} className="product-gaph">
                                        <canvas id={id}></canvas>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Productanalysis; 