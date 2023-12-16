const { Base64 } = require('js-base64');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const loginUser = (req, res) => {
  const { user_name, password } = req.body;

  // Check if username and password are provided
  if (!user_name || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const encodedPassword = Base64.encode(password);
  const sql = 'SELECT * FROM user WHERE user_name = ? AND password = ?';

  db.query(sql, [user_name, encodedPassword], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        console.log('Login successful');
        const user_id = result[0].id;
        console.log(user_id);
        res.status(200).json({ id:user_id});
      } else {
        console.log('Invalid username or password');
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
};

module.exports = { loginUser };
