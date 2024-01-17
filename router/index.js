var express = require('express')
var app = express()
var router = express.Router()

var registerRouter = require('./register/register')
var loginRouter = require('./login/login')
var totalRouter = require('./quotes/quotes_total')
var newTotalRouter = require('./quotes/quotes_new_total')
var popularTotalRouter = require('./quotes/quotes_popular_total')
var detailRouter = require('./quotes/quotes_detail')
var mypageRouter = require('./mypage/mypage')

var educationRouter = require('./education/education_stt')
var educationVocab = require('./education/education_word')

var searchRouter = require('./search/search')

router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/quotes', totalRouter)
router.use('/quotes', newTotalRouter)
router.use('/quotes', popularTotalRouter)
router.use('/quotes', detailRouter)
router.use('/mypage', mypageRouter)

router.use('/education', educationRouter)
router.use('/education', educationVocab)

router.use('/search', searchRouter)
module.exports = router