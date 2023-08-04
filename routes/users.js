const express = require('express');
const userController = require('../controllers/users-controller')
const router = express.Router()
var cors = require('cors')


router.post('/login', cors(), userController.login)

module.exports = router