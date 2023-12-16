const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const getProducts = (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Products fetched successfully');
      res.status(200).json(result);
    }
  });
};

module.exports = { getProducts };
