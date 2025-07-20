const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./backend/.env" });
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token'); // ✅ Note: header name should be 'auth-token'

  if (!token) {
    return res.status(401).json({ error: 'Access denied: No token provided' }); // ✅ send JSON
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Access denied: Invalid token' }); // ✅ send JSON
  }
};

module.exports = fetchuser; 