const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Invoice = require('./models/Invoice');
const User = require('./models/User');
const Product = require('./models/Product');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/dark-horse', { useNewUrlParser: true, useUnifiedTopology: true });

// User registration endpoint (for testing/admin use to create new users)
app.post('/api/users', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, isAdmin });
  try {
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send({ message: 'Error registering user', error });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send({ message: 'Invalid username or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send({ message: 'Invalid username or password' });
  }

  res.send({ message: 'Login successful', isAdmin: user.isAdmin, userId: user._id });
});

// Function to get the next invoice number
const getNextInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
  return lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;
};

// Endpoint to create an invoice
app.post('/api/invoices', async (req, res) => {
  const { userId, products } = req.body;

  const productDetails = await Product.find({ _id: { $in: products.map(p => p.productId) } });

  const total = productDetails.reduce((acc, product) => {
    const productOrder = products.find(p => p.productId.toString() === product._id.toString());
    return acc + product.price * productOrder.quantity;
  }, 0);

  const invoiceNumber = await getNextInvoiceNumber();

  const invoice = new Invoice({
    userId,
    products: productDetails.map(product => ({
      productId: product._id,
      quantity: products.find(p => p.productId.toString() === product._id.toString()).quantity,
      name: product.name,
      price: product.price
    })),
    total,
    invoiceNumber
  });

  try {
    await invoice.save();
    res.send(invoice);
  } catch (error) {
    res.status(400).send({ message: 'Error creating invoice', error });
  }
});

// Endpoint to get all invoices (for admin)
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('userId').populate('products.productId');
    res.send(invoices);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching invoices', error });
  }
});

// Endpoint to get invoices by userId
app.get('/api/invoices/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const invoices = await Invoice.find({ userId }).populate('products.productId');
    res.send(invoices);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching invoices', error });
  }
});

// Endpoint to fetch all products with search and filter functionality
app.get('/api/products', async (req, res) => {
  try {
    const { search, minPrice, maxPrice, department } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    if (department) {
      query.department = department;
    }

    const products = await Product.find(query);
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching products', error });
  }
});

// Endpoint to add a new product
app.post('/api/products', async (req, res) => {
  const { name, description, price, department } = req.body;
  const product = new Product({ name, description, price, department });
  try {
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: 'Error adding product', error });
  }
});

// Endpoint to delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting product', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













