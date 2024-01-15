var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var totalRouter = require('./quotes/quotes_total')
var newTotalRouter = require('./quotes/quotes_new_total')
var detailRouter = require('./quotes/quotes_detail')
var watchedRouter = require('./quotes/quotes_user')
var mypageRouter = require('./mypage/mypage')

var educationRouter = require('./education/education_stt')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', totalRouter)
router.use('/quotes', newTotalRouter)
router.use('/quotes', detailRouter)
router.use('/quotes', watchedRouter)
router.use('/mypage', mypageRouter)

router.use('/education', educationRouter)

module.exports = router