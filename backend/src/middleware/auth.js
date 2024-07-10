const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key';
const authenticateJWT = (roles = []) => {
  return (req, res, next) => {
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer){
      return res.status(404).json({ error: 'Error Are you logged in?' });
    }
    const token =tokenBearer.split(' ')[1];
    if (token) {
      jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden' });
        }

        if (roles.length && !roles.includes(user.role)) {
          return res.status(403).json({ error: 'Insufficient role' });
        }

        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};

module.exports = { authenticateJWT };