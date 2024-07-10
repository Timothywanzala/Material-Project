const { sequelize, Event, Program, DeliveryMode, User, EventFacilitator, EventCoordinator } = require('../../models');
const { check, validationResult } = require('express-validator');



// Create a new event
const createEvent = [
  check('title').isString().withMessage('Title should be a string'),
  check('event_date').isISO8601().toDate().withMessage('Invalid date format'),
  check('program_id').isInt().withMessage('Program ID must be an integer'),
  check('delivery_mode_id').isInt().withMessage('Delivery Mode ID must be an integer'),
  check('createdBy').optional().isInt().withMessage('Created By must be an integer'),
  check('status').isString().withMessage('Status must be a string'),
  check('details').optional().isString().withMessage('Details must be a string'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, event_date, program_id, delivery_mode_id, createdBy, status, details } = req.body;
      const event = await Event.create({
        title,
        event_date,
        program_id,
        delivery_mode_id,
        createdBy,
        status,
        details
      });
      res.status(201).json({
        message: 'Event created successfully',
        event: event
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];


// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Program,
          attributes: ['id', 'name'], // Include program id and name
        },
        {
          model: User,
          as: 'Creator', // Alias to distinguish this association
          attributes: [
            'id',
            [sequelize.literal("CONCAT(`Creator`.`first_name`, ' ', `Creator`.`last_name`)"), 'name'],
            'phone_contact'
          ], // Include creator id, concatenated name, and contact
        },
        {
          model: DeliveryMode,
          attributes: ['id', 'name'], // Include delivery mode id and name
        }
      ],
      attributes: {
        exclude: ['program_id', 'created_by', 'delivery_mode_id'], // Exclude the foreign key ids if you don't need them
      }
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Program,
          attributes: ['id', 'name'], // Include program id and name
        },
        {
          model: User,
          as: 'Creator', 
          attributes: ['id', 'first_name', 'last_name', 'phone_contact'], 
        },
        {
          model: DeliveryMode,
          attributes: ['id', 'name'], 
        }
      ],
      attributes: {
        exclude: ['program_id', 'created_by', 'delivery_mode_id'], 
      }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const eventJson = event.toJSON();
    if (eventJson.Creator) {
      eventJson.Creator.name = `${eventJson.Creator.first_name} ${eventJson.Creator.last_name}`;
      delete eventJson.Creator.first_name;
      delete eventJson.Creator.last_name;
    }

    res.status(200).json(eventJson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update an event
const updateEvent = [
  check('title').optional().isString().withMessage('Title should be a string'),
  check('event_date').optional().isISO8601().toDate().withMessage('Invalid date format'),
  check('program_id').optional().isInt().withMessage('Program ID must be an integer'),
  check('delivery_mode_id').optional().isInt().withMessage('Delivery Mode ID must be an integer'),
  check('created_by').optional().isInt().withMessage('Created By must be an integer'),
  check('status').optional().isString().withMessage('Status must be a string'),
  check('details').optional().isString().withMessage('Details must be a string'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      const updatedEvent = await event.update(req.body);
      res.status(200).json({
        message: 'Event updated successfully',
        event: updatedEvent
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const downloadEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: [
        'title',
        'details',
        'event_date',
        'status',
        [sequelize.fn('CONCAT', sequelize.col('Creator.first_name'), ' ', sequelize.col('Creator.last_name')), 'created_by'],
        [sequelize.col('Creator.phone_contact'), 'creator_contact'],
        [sequelize.col('Program.name'), 'program_name'],
        [sequelize.col('DeliveryMode.name'), 'delivery_mode']
      ],
      include: [
        {
          model: Program,
          attributes: []
        },
        {
          model: DeliveryMode,
          attributes: []
        },
        {
          model: User,
          as: 'Creator',
          attributes: []
        },
        {
          model: User,
          as: 'Facilitators',
          through: { attributes: [] },
          attributes: [
            [sequelize.fn('CONCAT', sequelize.col('Facilitators.first_name'), ' ', sequelize.col('Facilitators.last_name')), 'facilitated_by'],
            'phone_contact'
          ]
        },
        {
          model: User,
          as: 'Coordinators',
          through: { attributes: [] },
          attributes: [
            [sequelize.fn('CONCAT', sequelize.col('Coordinators.first_name'), ' ', sequelize.col('Coordinators.last_name')), 'coordinated_by'],
            'phone_contact'
          ]
        }
      ]
    });

    const eventsData = events.map(event => {

      // facilitators
      const facilitator_contacts = [];
      const facilitator_names = [];      

      const bio_info = event.Facilitators.map(facilitator => {
        facilitator_contacts.push(facilitator.dataValues.phone_contact);
        facilitator_names.push(facilitator.dataValues.facilitated_by);
       });      

      const facs1 = facilitator_names.map(facilitator => {
       return facilitator
      });
      const facilitators = `(${facs1.join(" | ")})`;

      const cont1 = facilitator_contacts.map(contact => {
        return contact
       });
 
      const contacts = `(${cont1.join(" | ")})`;

      // coordinators
      const coordinator_contacts = [];
      const coordinator_names = [];

      const bio_info_coordinators = event.Coordinators.map(coordinator => {
        coordinator_contacts.push(coordinator.dataValues.phone_contact);
        coordinator_names.push(coordinator.dataValues.coordinated_by);
       });

      const coors1 = coordinator_names.map(coordinator => {
       return coordinator
      });
      const coordinators = `(${coors1.join(" | ")})`;

      const coors_contact = coordinator_contacts.map(contact => {
        return contact
       });
       const contacts_coordinators = `(${coors_contact.join(" | ")})`;

      

      return {
        title: event.title,
        details: event.details,
        event_date: event.event_date,
        status: event.status,
        created_by: event.get('created_by'),
        creator_contact: event.get('creator_contact'),
        program_name: event.get('program_name') || '',
        delivery_mode: event.get('delivery_mode') || '',
        facilitated_by: facilitators,
        facilitator_contact: contacts,
        coordinated_by: coordinators,
        coordinator_contact: contacts_coordinators
      }
    });

    // Define CSV header
    const csvHeader = [
      'Event Title',
      'Event Details',
      'Event Date',
      'Status',
      'Created By',
      'Creator Contact',
      'Program Name',
      'Delivery Mode',
      'Facilitated By',
      'Facilitator Contact',
      'Coordinated By',
      'Coordinator Contact'
    ].join(',') + '\n';

    // Generate CSV rows
  
    const csvRows = eventsData.map(event => [
      event.title,
      event.details,
      event.event_date,
      event.status,
      event.created_by,
      event.creator_contact,
      event.program_name,
      event.delivery_mode,
      event.facilitated_by,
      event.facilitator_contact,
      event.coordinated_by,
      event.coordinator_contact
    ].join(',')).join('\n');

    // Combine header and rows
    const csvContent = csvHeader + csvRows;

    // Set response headers for CSV download
    res.setHeader('Content-Disposition', 'attachment; filename="events.csv"');
    res.setHeader('Content-Type', 'text/csv');

    // Send CSV content to client
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  downloadEvents
  
};
