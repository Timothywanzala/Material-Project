const express = require('express')
const requestTimeout = require('../../middleware/timeout');
const {getFacilitatorEventsDetails,getMembers ,getEventCountByDeliveryModeForFacilitator,getEventCountByFacilitator} = require('../../controllers/reports/ReportController')

router = express.Router()

router.get('/getAllFacilitatorDetails', getFacilitatorEventsDetails  )
router.get('/getEventCountByFacilitator', getEventCountByFacilitator  )
router.get('/getEventCountByDeliveryModeForFacilitator', getEventCountByDeliveryModeForFacilitator)
router.get('/getMembers', getMembers)
module.exports = {
    routes: router
}