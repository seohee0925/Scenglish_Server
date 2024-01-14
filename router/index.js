var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var totalRouter = require('./quotes/quotes_total')
var detailRouter = require('./quotes/quotes_detail')
var watchedRouter = require('./quotes/quotes_user')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', totalRouter)
router.use('/quotes', detailRouter)
router.use('/quotes', watchedRouter)

module.exports = router