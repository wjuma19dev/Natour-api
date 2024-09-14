const { writeFile } = require('fs')

module.exports = (file, data, alert) =>
	new Promise((resolve, reject) => {
		writeFile(file, JSON.stringify(data, null, 3), (err) => {
			if (err) reject(err.message)
			resolve(alert)
		})
	})
