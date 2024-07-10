const express = require('express')
const requestTimeout = require('../../middleware/timeout');

const {addRM} = require('../../controllers/users/rmController')


const router = express.Router()
router.use(requestTimeout);
/**
 * @swagger
 * /rm/add:
 *   post:
 *     summary: Add a new relationship manager
 *     tags: [Relationship Managers]
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
 *             example:
 *               name: Jane Doe
 *               email: jane.doe@example.com
 *               phone: +1-123-456-7890
 *     responses:
 *       200:
 *         description: Relationship manager added successfully
 */
router.post('/add', addRM)

module.exports = {  
    routes: router
}