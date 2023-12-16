const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const productController = require('./Controller/productController');
const loginController = require('./Controller/loginController');
const coffeeController = require('./Controller/coffeeController');
const registrationController = require('./Controller/registrationController'); 
const myOrdersController = require('./Controller/myOrdersController');

const cors = require('cors');
const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to get product order
app.get('/index/getProducts', productController.getProducts);

// Login API
app.post('/login', loginController.loginUser);

// Coffee purchase 
app.post('/buyCoffee', coffeeController.buyCoffee);

// User registration 
app.post('/register', registrationController.registerUser); 

app.post('/myOrders', myOrdersController.myOrders);

app.listen(3000, () => {
  console.log(`Server is running`);
});
