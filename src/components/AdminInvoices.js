import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Invoices</Typography>
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
    </Container>
  );
};

export default AdminInvoices;





