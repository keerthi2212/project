import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Payment.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';

function Payment() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Available coupons
    const coupons = [
        { code: 'WELCOME10', discount: 10, description: '10% off on your first order' },
        { code: 'DAIRY20', discount: 20, description: '20% off on dairy products' },
        { code: 'SUMMER15', discount: 15, description: '15% off on summer specials' }
    ];

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const calculateDiscount = () => {
        if (!selectedCoupon) return 0;
        const coupon = coupons.find(c => c.code === selectedCoupon);
        return coupon ? (calculateSubtotal() * coupon.discount / 100) : 0;
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount();
    };

    const handleCouponChange = (e) => {
        setSelectedCoupon(e.target.value);
    };

    const handlePayment = () => {
        // Create new order
        const newOrder = {
            items: cartItems,
            total: calculateTotal() + 40, // Including delivery fee
            date: new Date().toISOString(),
            status: 'pending'
        };

        // Get existing orders or initialize empty array
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Add new order
        existingOrders.unshift(newOrder);
        
        // Save updated orders
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // Clear cart
        localStorage.removeItem('cartItems');

        // Redirect to orders page
        window.location.href = '/orders';
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

                <main className={`payment-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="payment-header">
                        <div className="poli-wif">
                            <h1 className="name_ty">Payment</h1>
                        </div>
                    </div>

                    <div className="payment-content">
                        <div className="payment-left-section">
                            {/* Order Items Section */}
                            <div className="order-items">
                                <h2>Order Items</h2>
                                <div className="items-list">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-details">
                                                <h3>{item.name}</h3>
                                                <p>Quantity: {item.quantity}</p>
                                                <p className="item-price">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="payment-right-section">
                            {/* Coupons Section */}
                            <div className="coupons-section">
                                <h2>Apply Coupon</h2>
                                <div className="coupon-selector">
                                    <select value={selectedCoupon} onChange={handleCouponChange}>
                                        <option value="">Select a coupon</option>
                                        {coupons.map((coupon, index) => (
                                            <option key={index} value={coupon.code}>
                                                {coupon.code} - {coupon.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="payment-method">
                                <h2>Payment Method</h2>
                                <div className="method-options">
                                    <label className="method-option">
                                        <input type="radio" name="payment" value="card" />
                                        <span className="method-icon"><i className="fa fa-credit-card"></i></span>
                                        <span className="method-name">Credit/Debit Card</span>
                                    </label>
                                    <label className="method-option">
                                        <input type="radio" name="payment" value="upi" />
                                        <span className="method-icon"><i className="fa fa-mobile"></i></span>
                                        <span className="method-name">UPI</span>
                                    </label>
                                    <label className="method-option">
                                        <input type="radio" name="payment" value="cod" />
                                        <span className="method-icon"><i className="fa fa-money"></i></span>
                                        <span className="method-name">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="payment-summary">
                                <h2>Payment Summary</h2>
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal:</span>
                                        <span>₹{calculateSubtotal()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery Fee:</span>
                                        <span>₹40</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Discount:</span>
                                        <span>-₹{calculateDiscount()}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total Amount:</span>
                                        <span>₹{calculateTotal() + 40}</span>
                                    </div>
                                </div>
                                <button className="pay-button" onClick={handlePayment}>
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Payment;