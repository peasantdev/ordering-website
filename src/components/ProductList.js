import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ProductList = ({ title, products }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText primary={product.name} secondary={`$${product.price}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProductList;
