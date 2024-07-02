import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    department: ''
  });

  useEffect(() => {
    // Fetch the product details
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting updated product:', product);
    // Update the product
    axios.put(`http://localhost:5000/api/products/${id}`, product)
      .then(response => {
        console.log('Product updated:', response.data);
        if (response.status === 200) {
          navigate('/adminpanel'); // Redirect to admin panel or products list
        } else {
          console.error('Error updating product:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Edit Product</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        name="name"
        value={product.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        name="description"
        value={product.description}
        onChange={handleChange}
      />
      <Select
        name="department"
        value={product.department}
        onChange={handleChange}
        fullWidth
        displayEmpty
      >
        <MenuItem value="" disabled>Select Department</MenuItem>
        <MenuItem value="fruits">Fruits</MenuItem>
        <MenuItem value="vegetables">Vegetables</MenuItem>
        <MenuItem value="dairy">Dairy</MenuItem>
      </Select>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default AdminEditProduct;






