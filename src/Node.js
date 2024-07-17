// const express = require('express');
// const jwt = require('jsonwebtoken'); // You might use a library like jsonwebtoken

// const app = express();
// const port = 5000;

// // Middleware to verify the token
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).send('No token provided.');

//   jwt.verify(token, 'your-secret-key', (err, decoded) => {
//     if (err) return res.status(500).send('Failed to authenticate token.');
//     req.userId = decoded.id;
//     next();
//   });
// };

// app.get('/api/todolist', verifyToken, (req, res) => {
//   // Your logic to handle the request, e.g., checking user roles and permissions
//   res.json({ message: 'Welcome to the protected API' });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
