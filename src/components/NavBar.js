import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserLoginModal from './UserLoginModal';

const NavBar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dark Horse</Link>
        </Typography>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>
        {auth.isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/checkout">Checkout</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
        )}
        <UserLoginModal open={loginOpen} handleClose={handleLoginClose} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;







