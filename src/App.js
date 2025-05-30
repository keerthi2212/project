import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Products from './Product/Products';
import AddToCart from './addtocart/AddToCart';
import Payment from './payment/Payment';
import Orders from './orders/Orders';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Clients from './clients/Clients';
import Sales from './sales/sales';
import Productanalysis from './product-analysis/productanalysis';
import CustomerReview from './customer-review/customer-review';
import EmployeeList from './employeelist/employee-list';
import Marketing from './marketing/marketing';



function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/products" element={<Products />} />
          <Route path="/addtocart" element={<AddToCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/analysis" element={<Productanalysis />} />
          <Route path="/reviews" element={<CustomerReview />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/marketing" element={<Marketing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
