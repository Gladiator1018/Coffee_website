const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const myOrders = (req, res) => {
    const { product_id, user_id } = req.body;
  
    // if (product_id || user_id ) {
    //   return res.status(400).json({ error: 'User ID required' });
    // }
  
    const sql = 'select u.user_name, p.coffeName, p.description, p.price from products p join coffee_orders c on (p.id = c.product_id) join user u on (u.id = c.user_id) where u.id = ?';
  
    db.query(sql, [user_id, product_id], (err, result) => {
        if (err) {
            console.error('Error during query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length > 0) {
                console.log('Orders found');
                res.status(200).json(result);
            } else {
                console.log('No orders found');
                res.status(404).json({ error: 'No orders found' });
            }
        }
    });
  };
  
  module.exports = { myOrders };