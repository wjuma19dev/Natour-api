// 3er party libraries
const _ = require('lodash')

// Models
const Tour = require('../models/tourModel.js')
const { request, response } = require('express')

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
	aliasTop5Cheap (Setting queries)
 */
tourCtrl.aliasTop5Cheap = (req = request, res = response, next) => {
	req.query.sort = '-ratingAverage,price'
	req.query.limit = 5
	req.query.fields = 'name,price,summary,difficulty,ratingAverage'
	next()
}

/** 
	getAllToursCtrl
 */
tourCtrl.getAllToursCtrl = async (req = request, res, next) => {
	try {
		// 1A. Filtering
		const queriesObj = { ...req.query }
		const excludeQueries = ['page', 'sort', 'limit', 'fields']
		excludeQueries.forEach((el) => delete queriesObj[el])

		// 1B. Resolve { gte: 5 } change to { $gte: 5 } for valid mongoose operator
		let queryStr = JSON.stringify(queriesObj)
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		)

		let query = Tour.find(JSON.parse(queryStr))

		// 2A Sorting by price and ratingAverage
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ')
			query = query.sort(sortBy)
		} else {
			// By default solting by createAt
			query = query.sort('-createdAt')
		}

		// 3A Field limited
		if (req.query.fields) {
			const fields = req.query.fields.split(',').join(' ')
			query = query.select(fields)
		} else {
			query = query.select('-__v')
		}

		// 4A. Pagination
		const page = req.query.page * 1 || 1
		const limit = req.query.limit * 1 || 3
		const skip = (page - 1) * limit
		query = query.skip(skip).limit(limit)
		if (req.query.page) {
			const toursCount = await Tour.countDocuments()
			if (skip >= toursCount) throw Error('Page not found')
		}

		// 5. Execute query
		// console.log(req.query)
		const tours = await query

		// 6. Send response
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
