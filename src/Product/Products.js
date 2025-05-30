import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../home/company.css';   
import './Product.css';
import logo from '../home/Logo.png';
import logo1 from '../home/logo1.jpeg';
import freshmilk from './freshmilk.jpeg';
import Cheese from './cheese.jpeg';
import yogurt from './Yogurt.jpeg';
import milkpowder from './milk-powder.jpeg';
import milk from './milk.jpeg';
import Flavoredmilk  from './flav-milk.jpeg';

function Products() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
    const [messageText, setMessageText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize product quantity functionality
        const products = document.querySelectorAll('.Product-c');
        
        const setupProduct = (product) => {
            const minusButton = product.querySelector('.Minus');
            const plusButton = product.querySelector('.Plus');
            const inputField = product.querySelector('.Btn_M_P');
            const priceDetails = product.querySelector('.Price_tag_Details');
            
            // Set initial value to 0
            inputField.value = '0';
            
            let basePrice = parseInt(priceDetails.textContent);

            const updatePrice = (inputField, priceDetails, basePrice) => {
                let quantity = parseInt(inputField.value);
                if (isNaN(quantity) || quantity < 0) {
                    inputField.value = 0;
                    quantity = 1;
                }
                const newPrice = basePrice * (quantity || 1);
                priceDetails.textContent = newPrice + '₹';
            };

            // Remove all existing click listeners
            const newMinusButton = minusButton.cloneNode(true);
            const newPlusButton = plusButton.cloneNode(true);
            minusButton.parentNode.replaceChild(newMinusButton, minusButton);
            plusButton.parentNode.replaceChild(newPlusButton, plusButton);

            // Add single click listener for minus
            newMinusButton.onclick = (e) => {
                e.preventDefault();
                let currentValue = parseInt(inputField.value);
                if (currentValue > 0) {
                    inputField.value = currentValue - 1;
                    updatePrice(inputField, priceDetails, basePrice);
                }
            };

            // Add single click listener for plus
            newPlusButton.onclick = (e) => {
                e.preventDefault();
                let currentValue = parseInt(inputField.value);
                inputField.value = currentValue + 1;
                updatePrice(inputField, priceDetails, basePrice);
            };

            // Initial price update
            updatePrice(inputField, priceDetails, basePrice);
        };

        // Setup each product
        products.forEach(setupProduct);

        // No cleanup needed as we're using onclick instead of addEventListener
    }, []);

    const showPopupMessage = (text, type) => {
        setMessageText(text);
        setMessageType(type);
        setShowMessage(true);
        
        // Auto hide message after 5 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    const handleAddToCart = (productElement) => {
        const quantity = parseInt(productElement.querySelector('.Btn_M_P').value) || 1;
        const price = parseInt(productElement.querySelector('.Price_tag_Details').textContent);
        const name = productElement.querySelector('.Fresh_milk').textContent;
        const image = productElement.querySelector('.Img_Src').src;

        const newItem = {
            name,
            quantity,
            price,
            image
        };

        // Get existing cart items
        const existingCart = localStorage.getItem('cartItems');
        const cartItems = existingCart ? JSON.parse(existingCart) : [];
        
        // Check if item already exists in cart
        const isItemExists = cartItems.some(item => item.name === name);
        
        if (isItemExists) {
            showPopupMessage('Item is already in your cart!', 'error');
            return;
        }
        
        // Add new item
        cartItems.push(newItem);
        
        // Save updated cart
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show success message
        showPopupMessage('Item added to cart successfully!', 'success');
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

                <main className={`product-cart ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <div className="Grid_product">
                        <div className="Grid_Width">
                            <div className="Widht_plo">
                                <div className="poli-wif">
                                    <h1 className="name_ty">Products</h1>
                                </div>
                            </div>
                            <div className="w_flex">
                                {/* Product Cards */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={milkpowder} alt="Milk Powder" />
                                    </div>
                                    <h3 className="Fresh_milk">Milk Powder</h3>
                                    <p className="Rich_Milk">Rich and creamy fresh milk directly from our farms.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">90<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>

                                {/* Cheese */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={Cheese} alt="Cheese" />
                                    </div>
                                    <h3 className="Fresh_milk">Cheese</h3>
                                    <p className="Rich_Milk">Delicious cheese made from farm-fresh milk.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">180<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>

                                {/* Greek Yogurt */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={yogurt} alt="Greek Yogurt" />
                                    </div>
                                    <h3 className="Fresh_milk">Greek Yogurt</h3>
                                    <p className="Rich_Milk">Thick and creamy yogurt with natural ingredients.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">70<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>

                                {/* Organic Milk */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={milk} alt="Organic Milk" />
                                    </div>
                                    <h3 className="Fresh_milk">Organic Milk</h3>
                                    <p className="Rich_Milk">Pure organic milk with no preservatives.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">120<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>

                                {/* Fresh Milk */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={freshmilk} alt="Fresh Milk" />
                                    </div>
                                    <h3 className="Fresh_milk">Fresh Milk</h3>
                                    <p className="Rich_Milk">Rich and creamy fresh milk directly from our farms.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">70<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>

                                {/* Flavored Milk */}
                                <div className="Product-c">
                                    <div className="Img_Product_Milk">
                                        <img className="Img_Src" src={Flavoredmilk} alt="Flavored Milk" />
                                    </div>
                                    <h3 className="Fresh_milk">Flavored Milk</h3>
                                    <p className="Rich_Milk">Delicious and healthy flavored milk varieties.</p>
                                    <div className="Price_tag">
                                        <div className="M_t_Qu">
                                            <button className="Minus">-</button>
                                            <input className="Btn_M_P" type="text" />
                                            <button className="Plus">+</button>
                                        </div>
                                        <div className="Price_Details_Tag">
                                            <p className="Price_tag_Details">110<i id="Fa_Rupee" className="fa fa-rupee"></i></p>
                                        </div>
                                    </div>
                                    <div className="Btn_Im">
                                        <button className="Btn_Milk" onClick={(e) => handleAddToCart(e.currentTarget.closest('.Product-c'))}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Simple Message Popup */}
            {showMessage && (
                <div className={`message-popup ${messageType === 'error' ? 'error' : 'success'}`}>
                    <span>{messageText}</span>
                    {messageType === 'success' && (
                        <Link to="/addtocart" className="cart-link">View Cart</Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Products;