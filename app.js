const express = require('express')
const { readFileSync, writeFile } = require('fs')
const _ = require('lodash')

const app = express()

const Tour = require('./models/tour.js')

app.set('port', process.env.PORT || 3000)
app.use(express.json())

let tours = []

tours = JSON.parse(readFileSync(`${__dirname}/dev-data/data/tour-simple.json`))

app.get('/', (req, res, next) => {
	res.json({
		status: 'success',
		message: 'Overview works!.',
	})
})

app.get('/api/v1/tours', (req, res, next) => {
	res.json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
	})
})

app.get('/api/v1/tours/:id', (req, res, next) => {
	const tour = _.find(tours, { id: +req.params.id })
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			data: {
				tour: null,
				message: 'Tour not found',
			},
		})
	}
	res.json({
		status: 'success',
		data: { tour },
	})
})

app.post('/api/v1/tours', (req, res, next) => {
	const id = tours[tours.length - 1].id + 1
	const { name, duration, difficulty, price } = req.body
	const tour = new Tour(id, name, duration, difficulty, price)
	tours.push(tour)
	writeFile(
		`${__dirname}/dev-data/data/tour-simple.json`,
		JSON.stringify(tours, null, 3),
		(err) => {
			if (err) throw err
			res.json({
				status: 'success',
				data: {
					tour: null,
					message: 'Tour was created successfully.',
				},
			})
		}
	)
})

app.patch('/api/v1/tours/:id', (req, res, next) => {
	const id = +req.params.id
	const tour = _.find(tours, { id })
	if (!tour) {
		return res.status(404).json({
			status: 'fail',
			data: {
				tour: null,
				message: 'Tour not found',
			},
		})
	}

	tours[id].name = req.body.name
	tours[id].duration = req.body.duration
	tours[id].difficulty = req.body.difficulty
	tours[id].price = req.body.price

	writeFile(
		`${__dirname}/dev-data/data/tour-simple.json`,
		JSON.stringify(tours, null, 3),
		(err) => {
			if (err) throw err
			res.json('Tour was updated successfully.')
		}
	)
})

app.delete('/api/v1/tours/:id', (req, res, next) => {
	const id = +req.params.id
	const toursAfterDeleted = _.filter(tours, (tour) => tour.id !== id)

	if (tours.length < id) {
		return res.status(404).json({
			status: 'fail',
			data: {
				tour: null,
				message: 'Tour not found',
			},
		})
	}

	writeFile(
		`${__dirname}/dev-data/data/tour-simple.json`,
		JSON.stringify(toursAfterDeleted, null, 3),
		(err) => {
			if (err) throw err
			res.json({
				status: 'success',
				data: {
					tour: null,
					message: 'Tour was deleted succesfully.',
				},
			})
		}
	)
})

app.listen(
	app.get('port'),
	console.log(`Server running on port ${app.get('port')}`)
)
