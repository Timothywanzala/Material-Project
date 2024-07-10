const express = require('express');

const { authenticateUser } = require('../../controllers/auth/authController');


const router = express.Router();

router.post('/user', authenticateUser);

module.exports = {routes: router};
