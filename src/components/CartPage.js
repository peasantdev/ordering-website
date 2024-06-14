import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeItem, clearCart } = useCart();

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Shopping Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item._id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}, Price: $${item.price}`}
            />
            <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item._id)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleClearCart}>
        Clear Cart
      </Button>
    </Container>
  );
};

export default CartPage;

