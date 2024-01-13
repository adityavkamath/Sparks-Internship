// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/banking_app', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  currentBalance: Number,
});

const Customer = mongoose.model('Customer', customerSchema);

// Create Transfers Schema
const transferSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

const Transfer = mongoose.model('Transfer', transferSchema);

// Dummy Data
const seedDB = async () => {
  await Customer.deleteMany({});
  await Transfer.deleteMany({});

  const customers = [
    { name: 'Customer 1', currentBalance: 1000 },
    { name: 'Customer 2', currentBalance: 1200 },
    { name: 'Customer 3', currentBalance: 800 },
    { name: 'Customer 4', currentBalance: 1500 },
    { name: 'Customer 5', currentBalance: 2000 },
    { name: 'Customer 6', currentBalance: 700 },
    { name: 'Customer 7', currentBalance: 900 },
    { name: 'Customer 8', currentBalance: 1100 },
    { name: 'Customer 9', currentBalance: 1800 },
    { name: 'Customer 10',currentBalance: 1000 },
  ];

  const transfers = [
    { sender: 'Customer 1', receiver: 'Customer 2', amount: 200 },
    { sender: 'Customer 2', receiver: 'Customer 3', amount: 150 },
    { sender: 'Customer 4', receiver: 'Customer 5', amount: 300 },
    { sender: 'Customer 6', receiver: 'Customer 7', amount: 100 },
    { sender: 'Customer 8', receiver: 'Customer 9', amount: 200 },
    // Add more transfers as needed
    { sender: 'Customer 3', receiver: 'Customer 5', amount: 100 },
  ];

  await Customer.insertMany(customers);
  await Transfer.insertMany(transfers);
};

seedDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.render('customers', { customers });
});

app.get('/customers/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.render('customer', { customer });
});

app.get('/transfer', async (req, res) => {
  const customers = await Customer.find();
  res.render('transfer', { customers });
});

app.post('/transfer', async (req, res) => {
  const { sender, receiver, amount } = req.body;

  // Find sender and receiver customers
  const senderCustomer = await Customer.findOne({ name: sender });
  const receiverCustomer = await Customer.findOne({ name: receiver });

  // Ensure sender has enough balance
  if (senderCustomer.currentBalance < amount) {
    return res.send('Insufficient balance for the transfer.');
  }

  // Update sender's balance
  senderCustomer.currentBalance -= parseFloat(amount);
  await senderCustomer.save();

  // Update receiver's balance
  receiverCustomer.currentBalance += parseFloat(amount);
  await receiverCustomer.save();

  // Record the transfer
  await Transfer.create({ sender, receiver, amount });

  res.redirect('/transfers'); // Redirect to the transfers page after completing the transfer
});

app.get('/transfers', async (req, res) => {
  const transfers = await Transfer.find();
  res.render('transfers', { transfers });
});
