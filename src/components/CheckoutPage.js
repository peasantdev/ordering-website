import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { auth } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    console.log('Calculating total for cart items:', cart);
    if (cart.length === 0) {
      setTotal(0);
      return;
    }
    const totalPrice = cart.reduce((acc, item) => {
      console.log(`Item price: ${item.price}, quantity: ${item.quantity}`);
      return acc + item.price * item.quantity;
    }, 0);
    console.log('Total price calculated:', totalPrice);
    setTotal(totalPrice.toFixed(2));
  };

  const handleOrderSubmit = async () => {
    if (!auth.isLoggedIn) {
      alert('You need to be logged in to place an order');
      return;
    }

    const invoice = {
      userId: auth.userId,
      products: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))
    };

    try {
      await axios.post('http://localhost:5000/api/invoices', invoice);
      clearCart();
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Checkout</Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price}, Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${total}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
















