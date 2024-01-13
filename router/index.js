var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
// var loginRouter = require('./login/login')

router.use('/register', registerRouter)
// router.use('/login', loginRouter)

module.exports = router