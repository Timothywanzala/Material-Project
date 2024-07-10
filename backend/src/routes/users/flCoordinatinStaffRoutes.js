const express = require('express');
const { addFLCoordinatingStaff } = require('../../controllers/users/flCoordinatingStaffController');
const requestTimeout = require('../../middleware/timeout');

const router = express.Router();
router.use(requestTimeout);
// Route to add FL Coordinating Staff
/**
 * @swagger
 * /fl/add:
 *   post:
 *     summary: Add a FL Coordinating Staff
 *     tags: [FL Coordinating Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *     responses:
 *       201:
 *         description: FL Coordinating Staff added successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/add', addFLCoordinatingStaff);




module.exports = {routes:router};
