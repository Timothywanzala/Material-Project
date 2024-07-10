const {EventFacilitator, sequelize, Program, DeliveryMode, User, Event ,StatusDefinition,Participant} = require('../../models')

const getFacilitatorEventsDetails = async (req, res) => {
    try {
        const facilitators = await EventFacilitator.findAll({
            attributes: [],
            include: [
                {
                    model: User,
                    attributes: [
                        'id',
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ', sequelize.col('last_name')), 'facilitator_name'],
                        'first_name',
                        'last_name'
                    ]
                },
                {
                    model: Event,
                    attributes: ['id', 'title', 'event_date'],
                    include: [
                        { model: Program, attributes: ['name']  },
                        { model: DeliveryMode, attributes: ['name'] }
                    ]
                }
            ]
        });
        // Transform data
        const facilitatorMap = facilitators.reduce((acc, detail) => {
            const { id } = detail.User;
            const name = detail.User.last_name + " " +detail.User.first_name
            const event = {
                id: detail.Event.id,
                title: detail.Event.title,
                date: detail.Event.event_date,
                type: detail.Event.Program.name,
                delivery_mode: detail.Event.DeliveryMode.name
            };

            if (!acc[id]) {
                acc[id] = {
                    id:id,
                    name: name,
                    events: []
                };
            }

            acc[id].events.push(event);
            return acc;
        }, {});

        const result = Object.values(facilitatorMap);
        return res.status(200).send(result)
    } catch (e) {
        res.status(404).send({"Error": e.message})
    }
};
const getEventCountByFacilitator  = async (req, res) => {
    try {
        const eventCount =  await EventFacilitator.findAll({
            attributes: [
                [sequelize.col('user.id'), 'user_id'],
                [sequelize.fn('concat', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name')), 'facilitator_names'],
                [sequelize.fn('count', sequelize.col('*')), 'event_count']
            ],
            include: [
                { model: User, attributes: [] },
                { model: Event, attributes: [] }
            ],
            group: ['user.id', [sequelize.fn('concat', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name'))]],
            order: [[sequelize.fn('concat', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name')), 'desc']]
        });

        return res.status(400).send(eventCount)
    } catch (e) {
        res.status(404).send({"Error": e.message})
    }
};
const getEventCountByDeliveryModeForFacilitator  = async (req, res) => {
    try {
        const eventCountByDeliveryMode = await Event.findAll({
            attributes: [
                'delivery_mode_id',
                [sequelize.col('delivery_mode.name'), 'delivery_mode'],
                [sequelize.col('event_facilitator.user_id'), 'facilitator'],
                [sequelize.fn('concat', sequelize.col('user.first_name'), ' ', sequelize.col('user.last_name')), 'facilitator_name'],
                [sequelize.fn('count', sequelize.col('*')), 'event_count']
            ],
            include: [
                { model: DeliveryMode, attributes: [] },
                { model: EventFacilitator, attributes: [], include: [{ model: User, attributes: [] }] }
            ],
            group: ['delivery_mode_id', 'delivery_mode.name', 'event_facilitator.user_id'],
            order: [[sequelize.col('event_facilitator.user_id'), 'asc'], [sequelize.fn('count', sequelize.col('*')), 'desc']]
        });

        return res.status(400).send(eventCountByDeliveryMode)
    } catch (e) {
        res.status(404).send({"Error": e.message})
    }
};
const getMembers   = async (req, res) => {
    try {
        const eventCountByDeliveryMode =  await Participant.findAll({
            attributes: ['id', [sequelize.col('status_definition.name'), 'name']],
            include: [
                // { model: StatusDefinition, attributes: [] }
            ],
            where: { is_member: 1 }
        });
        return res.status(400).send(eventCountByDeliveryMode)
    } catch (e) {
        res.status(404).send({"Error": e.message})
    }
};

module.exports = {getFacilitatorEventsDetails, getEventCountByFacilitator, getEventCountByDeliveryModeForFacilitator, getMembers };