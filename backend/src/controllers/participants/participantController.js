const { where, Sequelize } = require('sequelize');
const { Participant, Event, EventParticipant,StatusDefinition, sequelize, User,Role } = require('../../models'); // Import the Participant model
const { validationResult, body, param } = require('express-validator');

// Validation rules for participant
const participantValidationRules = () => {
  return [
    body('first_name').isString().notEmpty().withMessage('First name is required and should be a string'),
    body('last_name').isString().notEmpty().withMessage('Last name is required and should be a string'),
    body('employer').optional().isString().withMessage('Employer should be a string'),
    body('date_of_birth').optional().isDate().withMessage('Date of birth should be a date'),
    body('is_member').optional().isInt().withMessage('Is member should be a boolean'),
    body('designation').optional().isString().withMessage('Designation should be a string'),
    body('registered_by').optional().isInt().withMessage('Registered by should be an integer')
  ];
};

// Create a new participant
const addParticipantToEvent = [
  participantValidationRules(),
  async (req, res) => {
    const errors = validationResult(req);
    const eventId = req.params.eventId;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event does not exist' });
      }

      // Use a transaction to ensure atomic operations
      const result = await sequelize.transaction(async (t) => {
        const newParticipant = await Participant.create(req.body, { transaction: t });

        if (!newParticipant) {
          throw new Error('Could not register Participant');
        }

        await EventParticipant.create({
          event_id: eventId,
          participant_id: newParticipant.id
        }, { transaction: t });

        return newParticipant;
      });

      res.status(201).json({ message: 'Successful', participant: result });
    } catch (error) {
      if (error.message === 'Could not register Participant') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
];

// Get all participants
const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      include: [
        {
          model: StatusDefinition,
          attributes: ['name']
        }
      ],
      attributes: ['id', 'first_name','last_name', 'date_of_birth', 'telephone'] // Specify the attributes you need from the Participant model
    });
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single participant by Contact
const getParticipantByContact = [
  param('contact').isString().withMessage('contact should be an integer'),
  param('eventId').isInt().withMessage('eventId should be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const participants = await EventParticipant.findAll({
        attributes: ['participant_id'],
        include: [{
          model: Participant,
          attributes: [
            [Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 'full_name'],
            'employer',
            'date_of_birth'
          ],
          where: {
            telephone: req.params.contact
          }
        }],
        where: {
          event_id: req.params.eventId
        }
      });
  
     
      res.status(200).json(participants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];
const updateParticipantWithContact = [
  param('contact').isString().withMessage('Contact should be a string'),
  param('eventId').isInt().withMessage('eventId should be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = req.params.contact;
    const eventId = req.params.eventId;

    try {
      const participant = await Participant.findOne({
        where: { telephone: contact }
      });

      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const eventParticipant = await EventParticipant.findOne({
        where: {
          event_id: eventId,
          participant_id: participant.id
        }
      });

      if (!eventParticipant) {
        return res.status(404).json({ error: 'Participant not registered for this event' });
      }

      await participant.update(req.body);
      res.status(200).json(participant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

// Delete a participant by ID
const deleteParticipant = [
  param('contact').isString().withMessage('Contact should be a string'),
  param('eventId').isInt().withMessage('eventId should be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = req.params.contact;
    const eventId = req.params.eventId;

    try {
      const participant = await Participant.findOne({
        where: { telephone: contact }
      });

      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const eventParticipant = await EventParticipant.findOne({
        where: {
          event_id: eventId,
          participant_id: participant.id
        }
      });

      if (!eventParticipant) {
        return res.status(404).json({ error: 'Participant not registered for this event' });
      }

      await participant.destroy();
      res.status(204).send("successful");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

const checkIfRegisteredForEvent = [
  param('contact').isString().withMessage('Contact should be a string'),
  param('eventId').isInt().withMessage('eventId should be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = req.params.contact;
    const eventId = req.params.eventId;

    try {
      const participant = await Participant.findOne({
        where: { telephone: contact }
      });

      if (!participant) {
        return res.status(404).json({ error: 'Participant not found' });
      }

      const event = await Event.findByPk(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const eventParticipant = await EventParticipant.findOne({
        where: {
          event_id: eventId,
          participant_id: participant.id
        }
      });

      if (!eventParticipant) {
        return res.status(404).json({ error: 'Participant not registered for this event' });
      }

     
      res.status(200).json("Participant is registered for this event");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
]


module.exports = {
    addParticipantToEvent,
    getAllParticipants,
    getParticipantByContact,
    deleteParticipant,
  updateParticipantWithContact,
  checkIfRegisteredForEvent
}