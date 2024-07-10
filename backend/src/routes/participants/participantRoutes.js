const express = require('express');
const {
    addParticipantToEvent,
    getAllParticipants,
    getParticipantByContact,
    deleteParticipant,
    updateParticipantWithContact,
    checkIfRegisteredForEvent
} = require('../../controllers/participants/participantController');
const requestTimeout = require('../../middleware/timeout');

const router = express.Router();
router.use(requestTimeout);
// Route to add a single participants to an event
/**
 * @swagger
 * /participants/{eventId}/add:
 *   post:
 *     summary: Add a single participants to an event
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to add the participants to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantName:
 *                 type: string
 *               employerNumber:
 *                 type: string
 *               phoneContact:
 *                 type: string
 *               email:
 *                 type: string
 *               mothersName:
 *                 type: string
 *               lastEmployer:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               NIN:
 *                 type: string
 *               isMember:
 *                 type: boolean
 *               NSSFNumber:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Participant added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Event not found
 */
router.post('/:eventId/add', addParticipantToEvent);




// Route to get a specific participants from an event
/**
 * @swagger
 * /participants/{eventId}/get/{participantId}:
 *   get:
 *     summary: Get a specific participants from an event
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: ID of the participants
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant data
 *       400:
 *         description: Bad request
 *       404:
 *         description: Event or participants not found
 */
router.get('/:eventId/get/:contact', getParticipantByContact);

/**
 * @swagger
 * /participants/{eventId}/update/{participantId}:
 *   put:
 *     summary: Update participants details
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *           example: B8OXALs8QPFyUleEKOgf
 *         required: true
 *         description: The ID of the participants to update
 *       - in: path
 *         name: participantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the update to apply
 *       - in: body
 *         name: updates
 *         schema:
 *           type: object
 *         required: true
 *         description: The updates to apply to the participants
 *     responses:
 *       200:
 *         description: Participant updated successfully
 *       404:
 *         description: Participant not found
 */
router.put('/:eventId/update/:contact', updateParticipantWithContact);

/**
 * participants
 * @swagger
 * /participants/{eventId}/delete/{participantId}:
 *   delete:
 *     summary: Delete a participants
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *           example: B8OXALs8QPFyUleEKOgf
 *         required: true
 *         description: The ID of the participants to delete
 *       - in: path
 *         name: participantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the deletion action
 *     responses:
 *       200:
 *         description: Participant deleted successfully
 *       404:
 *         description: Participant not found
 */
router.delete('/:eventId/delete/:contact', deleteParticipant);


/**
 * @swagger
 * /participants/{eventId}/searchParticipants:
 *   get:
 *     summary: Search participants by name
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           example: B8OXALs8QPFyUleEKOgf
 *       - in: query
 *         name: participantName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the participants to search
 *     responses:
 *       200:
 *         description: Search results
 */
// router.get('/:eventId/searchParticipants', searchParticipantsByName);

/**
 * @swagger
 * /participants/{eventId}/getKYC:
 *   get:
 *     summary: Get KYC details for a participants
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         example: B8OXALs8QPFyUleEKOgf
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: KYC details
 */
// router.get('/:eventId/getKYC', getKYCDetailsForMemberParticipants);

/**
 * @swagger
 * /participants/{eventId}/getAllParticipants:
 *   get:
 *     summary: Get all participants for a specific event
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         example: B8OXALs8QPFyUleEKOgf
 *         required: true
 *         schema:
 *           type: string
 *           
 *     responses:
 *       200:
 *         description: List of participants
 */
// router.get('/:eventId/getAllParticipants', getAllParticipantsForEvent);
/**
 * @swagger
 * /participants/allParticipants:
 *   get:
 *     summary: Get all participants for all events
 *     tags: [Participants]
 *     responses:
 *       200:
 *         description: List of participants for all events
 */
router.get('/allParticipants', getAllParticipants);


/**
 * @swagger
 * /participants/{eventId}/upload-csv:
 *   post:
 *     summary: Upload bulk registrations of participants via CSV file
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           example: B8OXALs8QPFyUleEKOgf
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Bulk registrations uploaded successfully
 *       400:
 *         description: Bad request
 */
// router.post('/:eventId/upload-csv', upload.single('file'), uploadParticipants);

router.get('/isregistered/:eventId/:contact', checkIfRegisteredForEvent);



module.exports = { routes: router };
