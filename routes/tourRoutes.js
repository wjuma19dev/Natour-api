const express = require('express')
const tourRoutes = express.Router()

const tourCtrl = require('../controllers/tourController.js')

// REVIEW router.param
tourRoutes.param('id', tourCtrl.checkId)

tourRoutes
	.route('/')
	.get(tourCtrl.getAllToursCtrl)
	.post(tourCtrl.check, tourCtrl.createTourCtrl)

tourRoutes
	.route('/:id')
	.get(tourCtrl.getTourCtrl)
	.patch(tourCtrl.updateTourCtrl)
	.delete(tourCtrl.deleteTourCtrl)

module.exports = tourRoutes
