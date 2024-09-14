require('dotenv').config()
const mongoose = require('mongoose')
const { readFileSync } = require('fs')
const argv = require('process.argv')
const processArgv = argv(process.argv.slice(2))

const DB_URI = `mongodb://127.0.0.1/${process.env.DB_NAME}`
const Tour = require('../../models/tourModel.js')
const toursFilePath = `${__dirname}/tour-simple.json`

mongoose.connect(DB_URI).then(() => {
	console.log('Database online')
})

function importTours() {
	const tours = JSON.parse(readFileSync(toursFilePath, 'utf-8'))
	Tour.insertMany(tours)
		.then(() => {
			console.log('Tours imported succesfully.')
			process.exit(0)
		})
		.catch((err) => {
			console.log(err.message)
			process.exit(1)
		})
}

function deleteTours() {
	Tour.deleteMany().then(() => {
		console.log('Tours deleted.')
		process.exit(0)
	})
}

if (processArgv().drop === true) {
	deleteTours()
} else if (processArgv().import === true) {
	importTours()
} else {
	console.log('Please send for params --import 0r --drop')
	process.exit(0)
}
