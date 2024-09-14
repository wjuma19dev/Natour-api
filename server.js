const app = require('./app.js')
const mongoose = require('mongoose')

let DB_URI

if (process.env.NODE_ENV === 'production') {
	DB_URI = process.env.DB_URI.replace(
		'<db_password>',
		process.env.DB_PASSWORD
	).replace('<db_name>', process.env.DB_NAME)
} else {
	DB_URI = `mongodb://127.0.0.1/${process.env.DB_NAME}`
}

mongoose
	.connect(DB_URI)
	.then((client) => {
		app.listen(
			app.get('port'),
			console.log(
				`Server running on port ${app.get('port')} | Database online`
			)
		)
	})
	.catch((err) => console.log(err.message))
