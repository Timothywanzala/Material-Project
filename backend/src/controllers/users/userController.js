const { User } = require('../../models');
const { validationResult, body } = require('express-validator');
const Validator = require('fastest-validator');
const v = new Validator();


const addUser = async (req, res) => {
  await body('id_user').isNumeric().withMessage('User ID must be a number').run(req);
  await body('email').isEmail().withMessage('Invalid email address').run(req);
  await body('phone_contact').isLength({ min: 5 }).withMessage('Phone contact must be at least 10 characters').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const userData = req.body;

  try {
    console.log('Creating user with data:', userData);
    const user = await User.create(userData);
    console.log('User created successfully:', user);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, phone_contact } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      user.email = email;
      user.phone_contact = phone_contact;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser
};
