const express = require('express');
const requestTimeout = require('../../middleware/timeout');
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    downloadEvents,
    deleteEvent
} = require('../../controllers/events/eventController');
const { ensureAuthenticated, ensureRole } = require('../../middleware/auth');

const router = express.Router();
// router.use(requestTimeout);
/**
 * @swagger
 * /event/add:
 *   post:
 *     summary: Add a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *               eventDate:
 *                 type: string
 *               deliveryMode:
 *                 type: string
 *               details:
 *                 type: string
 *               flProgramName:
 *                 type: string
 *               relationshipManagerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               eventName: Example Event 2
 *               eventDate: 2023-05-01
 *               deliveryMode: online
 *               details: This is an example event
 *               flProgramName: Example Program
 *               relationshipManagerIds: [ "3u1aYRId7cRiov4BBN3J", "jl4KPXgzw8bvjDOmsXcY" ]
 *     responses:
 *       200:
 *         description: Event added successfully
 */
router.post('/add', createEvent);

/**
 * @swagger
 * /event/get/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 */
router.get('/get/:id', getEventById); // Get a particular event by ID

/**
 * @swagger
 * /event/get:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events
 */
router.get('/get', getAllEvents); 

/**
 * @swagger
 * /event/delete/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Error deleting event
 */
 router.delete('/delete/:id', deleteEvent);
/**
 * @swagger
 * /event/edit/{id}:
 *   put:
 *     summary: Edit an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *               eventDate:
 *                 type: string
 *               deliveryMode:
 *                 type: string
 *               details:
 *                 type: string
 *               flProgramName:
 *                 type: string
 *               relationshipManagerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               flCoordinatingStaffIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               eventName: Updated Event Name
 *               eventDate: 2023-06-01
 *               deliveryMode: offline
 *               details: Updated event details
 *               flProgramName: Updated Program
 *               relationshipManagerIds: [ "3u1aYRId7cRiov4BBN3J" ]
 *               flCoordinatingStaffIds: [ "jl4KPXgzw8bvjDOmsXcY" ]
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Error updating event
 */
 router.put('/edit/:id', updateEvent);
/**
 * @swagger
 * /event/download-events:
 *   get:
 *     summary: Download all events Details as CSV
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: CSV file containing all events
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Error downloading CSV
 */
// router.get('/download-events',ensureAuthenticated, ensureRole('creator'), downloadEvents);
router.get('/download', downloadEvents);
module.exports = {
    routes: router
};
