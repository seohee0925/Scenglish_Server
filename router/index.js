var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var quotesRouter = require('./quotes/quotes')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', quotesRouter)

module.exports = router