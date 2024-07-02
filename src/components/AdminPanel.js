import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', department: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '', isAdmin: false });
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchInvoices();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addProduct = async () => {
    if (!newProduct.department) {
      alert('Please select a department');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      const updatedProducts = [...products, response.data];
      setProducts(updatedProducts);
      setNewProduct({ name: '', description: '', price: '', department: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      setNewUser({ username: '', password: '', isAdmin: false });
      alert('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Admin Panel</Typography>

      {/* Product Management */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>Manage Products</Typography>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleProductInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleProductInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleProductInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          name="department"
          value={newProduct.department}
          onChange={handleProductInputChange}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>Select Department</MenuItem>
          <MenuItem value="fruits">Fruits</MenuItem>
          <MenuItem value="vegetables">Vegetables</MenuItem>
          <MenuItem value="dairy">Dairy</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={addProduct}>
          Add Product
        </Button>
        <List>
          {products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={product.name}
                secondary={`Description: ${product.description}, Price: $${product.price}, Department: ${product.department}`}
              />
              <Button component={Link} to={`/admin/edit-product/${product._id}`} variant="contained" sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => deleteProduct(product._id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* User Management */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>Create New User</Typography>
        <TextField
          label="Username"
          name="username"
          value={newUser.username}
          onChange={handleUserInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleUserInputChange}
          fullWidth
          margin="normal"
        />
        <Select
          name="isAdmin"
          value={newUser.isAdmin}
          onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value === 'true' })}
          fullWidth
          displayEmpty
        >
          <MenuItem value="false">User</MenuItem>
          <MenuItem value="true">Admin</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={addUser}>
          Create User
        </Button>
      </Box>

      {/* Invoice Management */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>Invoices</Typography>
        <List>
          {invoices.map((invoice, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Invoice #${invoice.invoiceNumber}`}
                secondary={`Total: $${invoice.total.toFixed(2)}`}
              />
              <List>
                {invoice.products.map((product, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={product.name}
                      secondary={`Quantity: ${product.quantity}, Price: $${product.price}`}
                    />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AdminPanel;














