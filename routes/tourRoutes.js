const express = require('express')
const tourRoutes = express.Router()

const tourCtrl = require('../controllers/tourController.js')

// REVIEW router.param
tourRoutes.param('id', tourCtrl.checkId)

tourRoutes
	.route('/top-5-cheap')
	.get(tourCtrl.aliasTop5Cheap, tourCtrl.getAllToursCtrl)

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
