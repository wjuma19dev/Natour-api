// 3er party libraries
const _ = require('lodash')

// Models
const Tour = require('../models/tourModel.js')
const { request } = require('express')

// Main controller object
const tourCtrl = {}

// Middlewares
tourCtrl.checkId = (req, res, next, id) => {
	if (id.length !== 24) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid id, please enter a mongodb valid id.',
		})
	}
	next()
}
tourCtrl.check = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Name and price are required!.',
		})
	}
	next()
}

/** 
	getAllToursCtrl
 */
tourCtrl.getAllToursCtrl = async (req = request, res, next) => {
	// 1. Filtering
	const queriesObj = req.query
	const excludeQueries = ['page', 'sort', 'limit', 'fields']
	excludeQueries.forEach((el) => delete queriesObj[el])

	// 2. Resolve { gte: 5 } change to { $gte: 5 } for valid mongoose operator
	let queryStr = JSON.stringify(queriesObj)
	queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
	console.log(JSON.parse(queryStr))

	// 3. Query
	const query = Tour.find(JSON.parse(queryStr))

	try {
		// 4. Execute query
		const tours = await query
		// 5. Send response
		res.json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		})
	}
}

/** 
	getTourCtrl
 */
tourCtrl.getTourCtrl = async (req, res, next) => {
	try {
		const tour = await Tour.findById(req.params.id)
		if (!tour) {
			return res.status(404).json({
				status: 'success',
				message: 'Tour not found.',
				data: {
					tour,
				},
			})
		}
		res.json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		})
	}
}

/** 
	createTourCtrl
 */
tourCtrl.createTourCtrl = (req, res, next) => {
	const tour = new Tour(req.body)
	tour.save()
		.then((_doc) => {
			res.json({
				status: 'success',
				message: 'Tour created succesfuly.',
				data: {
					tour: _doc,
				},
			})
		})
		.catch((err) => {
			res.status(400).json({
				status: 'fail',
				message: err.message,
				data: null,
			})
		})
}

/** 
	updateTourCtrl
 */
tourCtrl.updateTourCtrl = async (req = request, res, next) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		if (!tour) {
			return res.status(400).json({
				status: 'fail',
				message: 'There was an error trying to update this tour',
				data: {
					tour,
				},
			})
		}

		res.json({
			status: 'success',
			message: 'Tour udated successfuly.',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
			data: null,
		})
	}
}

/** 
	deleteTourCtrl
 */
tourCtrl.deleteTourCtrl = async (req = request, res, next) => {
	try {
		const deletedTour = await Tour.findByIdAndDelete(req.params.id)
		if (!deletedTour) {
			return res.status(400).json({
				status: 'fail',
				message: 'Tour not exists, please verify and try again.',
				data: {
					tour: deletedTour,
				},
			})
		}
		res.json({
			status: 'success',
			message: 'Tour deleted successfuly.',
			data: {
				tour: deletedTour,
			},
		})
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
			data: null,
		})
	}
}

module.exports = tourCtrl
