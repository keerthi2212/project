import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddToCart.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import Freshmilk from '../Product/freshmilk.jpeg';
import Yogurt from '../Product/Yogurt.jpeg';  
import Cheese from '../Product/cheese.jpeg';  

function AddToCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Suggested items data
    const suggestedItems = [
        {
            name: "Fresh Milk",
            price: 70,
            image: Freshmilk,
            description: "Rich and creamy fresh milk"
        },
        {
            name: "Greek Yogurt",
            price: 70,
            image: Yogurt,
            description: "Thick and creamy yogurt"
        },
        {
            name: "Cheese",
            price: 180,
            image: Cheese,
            description: "Delicious cheese"
        }
    ];

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const handleUpdateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedItems = [...cartItems];
        const item = updatedItems[index];
        
        const basePrice = item.price / item.quantity;
        item.quantity = newQuantity;
        item.price = basePrice * newQuantity;
        
        updatedItems[index] = item;
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleRemoveItem = (index) => {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleAddSuggestedItem = (item) => {
        // Check if item already exists in cart
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        
        if (existingItem) {
            setMessage({
                text: `${item.name} is already in your cart`,
                type: 'warning'
            });
            // Clear message after 3 seconds
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
            return;
        }

        const newItem = {
            name: item.name,
            quantity: 1,
            price: item.price,
            image: item.image
        };

        const updatedItems = [...cartItems, newItem];
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        
        setMessage({
            text: `${item.name} added to cart`,
            type: 'success'
        });
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
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
                        <li id="dashboard-link"><Link to="/dashboard">Dashboard</Link></li>
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

                <main className={`cart-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="cart-header">
                        <div className="poli-wif">
                            <h1 className="name_ty">Your Cart</h1>
                        </div>
                        {/* <Link to="/products" className="continue-shopping">Continue Shopping</Link> */}
                    </div>

                    {message.text && (
                        <div className={`message-popup ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="cart-page-content">
                        <div className="cart-main-section">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                    <Link to="/products" className="start-shopping">Start Shopping</Link>
                                </div>
                            ) : (
                                <div className="cart-content">
                                    <div className="cart-items">
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="cart-item">
                                                <div className="item-image">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className="item-details">
                                                    <h3>{item.name}</h3>
                                                    <div className="quantity-controls">
                                                        <button onClick={() => handleUpdateQuantity(index, item.quantity - 1)}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => handleUpdateQuantity(index, item.quantity + 1)}>+</button>
                                                    </div>
                                                    <div className="item-price">
                                                        <span>₹{item.price}</span>
                                                    </div>
                                                    <button className="remove-item" onClick={() => handleRemoveItem(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-summary">
                                        <h2>Order Summary</h2>
                                        <div className="summary-row">
                                            <span>Subtotal:</span>
                                            <span>₹{calculateTotal()}</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Shipping:</span>
                                            <span>Free</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Total:</span>
                                            <span>₹{calculateTotal()}</span>
                                        </div>
                                        <Link to="/payment" className="checkout-button">Proceed to Checkout</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="suggested-items">
                            <h2>You May Also Like</h2>
                            <div className="suggested-items-list">
                                {suggestedItems.map((item, index) => (
                                    <div key={index} className="suggested-item">
                                        <div className="suggested-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="suggested-item-details">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <div className="suggested-item-price">₹{item.price}</div>
                                            <button 
                                                className="add-to-cart-btn"
                                                onClick={() => handleAddSuggestedItem(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
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

export default AddToCart;