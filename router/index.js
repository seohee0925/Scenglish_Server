var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var quotesRouter = require('./quotes/quotes')
// var watchedRouter = require('./quotes/quotes_user')/

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', quotesRouter)
// router.use('/quotes', watchedRouter)

module.exports = router