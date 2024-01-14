var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var quotesRouter = require('./quotes/quotes')
var watchedRouter = require('./quotes/quotes_user')
var totalRouter = require('./quotes/quotes_total')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', quotesRouter)
router.use('/quotes', watchedRouter)
router.use('/quotes', totalRouter)

module.exports = router