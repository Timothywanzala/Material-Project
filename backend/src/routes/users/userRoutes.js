const express = require('express')

const requestTimeout = require('../../middleware/timeout');
const { getAllUsers, addUser } = require('../../controllers/users/userController');
// const router = require('./authRoutes');


router = express.Router()

router.get('/get', getAllUsers)
router.post('/add', addUser)
module.exports = {
    routes: router
}
