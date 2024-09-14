const express = require('express')
const userRoutes = express.Router()

const userCtrl = require('../controllers/userController.js')

/** USERS routes */
userRoutes.route('/').get(userCtrl.getAllUsersCrl).post(userCtrl.createUserCtrl)
userRoutes
	.route('/:id')
	.get(userCtrl.getUserCrl)
	.patch(userCtrl.updateUserCtrl)
	.delete(userCtrl.deleteUserCtrl)

module.exports = userRoutes
