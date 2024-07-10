const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../models');


const secretKey = 'secret_key';
const jwtSecret = 'secret_key';

const generateSignature = (userId, channelId, timestamp) => {
  const data = `${userId}:${channelId}:${timestamp}`;
  return CryptoJS.HmacSHA512(data, secretKey).toString(CryptoJS.enc.Hex);
}

const authenticateUser = async (req, res) => {
  const { userId, channelId, timestamp, signature } = req.body;

  const generatedSignature = generateSignature(userId, channelId, timestamp);
  if (generatedSignature === signature) {
    try {
      // Query to find the user and their role
      const user = await User.findOne({
        attributes: ['email'],
        include: [{
          model: Role,
          attributes: ['name'],
          through: { attributes: [] } // Exclude junction table attributes
        }],
        where: { email: userId }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const role = user.Roles.length > 0 ? user.Roles[0].name : null;
      // Signature matches, generate JWT
      const token = jwt.sign({ userId, channelId, role }, jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
};



module.exports = { authenticateUser };