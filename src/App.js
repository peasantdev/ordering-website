import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import AdminPanel from './components/AdminPanel';
import AdminInvoices from './components/AdminInvoices';
import AdminLoginPage from './components/AdminLoginPage';
import LoginPage from './components/LoginPage';
import AdminEditProduct from './components/AdminEditProduct'; // Import the new component
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Box>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/adminpanel" element={<ProtectedRoute element={AdminPanel} isAdminRoute={true} />} />
              <Route path="/admin/invoices" element={<ProtectedRoute element={AdminInvoices} isAdminRoute={true} />} />
              <Route path="/admin/edit-product/:id" element={<ProtectedRoute element={AdminEditProduct} isAdminRoute={true} />} /> {/* Add this route */}
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Box>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

















