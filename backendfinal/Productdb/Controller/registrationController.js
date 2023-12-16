const { Base64 } = require('js-base64');
const mysql = require('mysql');


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const registerUser = (req, res) => {
  const { user_name, email, contact_Number, password } = req.body;

  if (!user_name || !email || !contact_Number || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  //  email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }


  // Check if the phone number format is valid
  // const phoneRegex = /^\d{10}$/;
  // if (!phoneRegex.test(contact_Number)) {
  //   return res.status(400).json({ error: 'Invalid phone number format' });
  // }

  const encodedPassword = Base64.encode(password);
  const sql = 'INSERT INTO user (user_name, email, contact_Number, password) VALUES (?, ?, ?, ?)';

  db.query(sql, [user_name, email, contact_Number, encodedPassword], (err, result) => {
    if (err) {
      console.error('Error during user registration:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registration successful');
      res.status(200).json({ message: 'User registration successful' });
    }
  });
};

module.exports = { registerUser };
