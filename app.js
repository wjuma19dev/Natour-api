const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res, next) => {
	res.json({
		status: 'success',
		message: 'Overview works!.',
	})
})

app.listen(
	app.get('port'),
	console.log(`Server running on port ${app.get('port')}`),
)
