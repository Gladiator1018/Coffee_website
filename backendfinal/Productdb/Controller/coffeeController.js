const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const buyCoffee = (req, res) => {
  const { coffeeId, userId } = req.body;

  if (!coffeeId || !userId) {
    return res.status(400).json({ error: 'coffeeId and userId are required' });
  }

  const sql = 'INSERT INTO coffee_orders (product_id, user_id) VALUES (?, ?)';

  db.query(sql, [coffeeId, userId], (err, result) => {
    if (err) {
      console.error('Error during coffee purchase:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Coffee purchase successful');
      res.status(200).json({ message: 'Coffee purchase successful' });
    }
  });
};

module.exports = { buyCoffee };
