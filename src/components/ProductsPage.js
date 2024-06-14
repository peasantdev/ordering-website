import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Products</Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText
              primary={product.name}
              secondary={`Price: $${product.price}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductsPage;








