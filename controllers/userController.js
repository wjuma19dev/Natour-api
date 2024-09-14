const userCtrl = {}

userCtrl.createUserCtrl = (req, res, next) => {
	res.json({
		status: 'success',
		data: {
			users: [],
		},
	})
}

userCtrl.getAllUsersCrl = (req, res, next) => {
	res.json({
		status: 'success',
		data: {
			users: [],
		},
	})
}

userCtrl.getUserCrl = (req, res, next) => {
	res.json({
		status: 'success',
		data: {
			user: [],
		},
	})
}

userCtrl.updateUserCtrl = (req, res, next) => {
	res.json({
		status: 'success',
		data: {
			user: [],
			message: 'User was updated',
		},
	})
}

userCtrl.deleteUserCtrl = (req, res, next) => {
	res.json({
		status: 'success',
		data: {
			user: [],
			message: 'User was deleted',
		},
	})
}

module.exports = userCtrl
