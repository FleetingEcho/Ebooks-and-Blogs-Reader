const createError = require('http-errors')
const express = require('express')
require('colors')
const path = require('path')
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const history = require('connect-history-api-fallback')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const dataRouter = require('./routes/data');
const compression = require('compression')
const app = express()
//use compression before other middleWares

app.use(helmet());
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'file_storage')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'images')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.all('*', function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
// 	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
// 	res.header('Access-Control-Allow-Credentials', 'true')
// 	next()
// })


app.use(history({
  // verbose: true,
  index: '/'
}))
app.get("/", (req,res)=>{
	res.sendFile(path.join(__dirname,"dist","index.html"))
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/data', dataRouter)
const whiteListUrl = {
  get: [
		// '/index/getDataAction',
		// '/',
		'data/file_storage/*',
		'file_storage/*',
		'data/images/*',
		'images/*',

  ],
  post: [
		'/index/login',
  ]
}

const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str))
}

app.all('*', (req, res, next) => {
  let method = req.method.toLowerCase()
  let path = req.path
  if(whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()
  else {
    const token = req.headers.authorization
    if (!token) res.status(401).send('there is no token, please login')
    else {
      jwt.verify(token, 'abcd', (error, decode) => {
        if (error) res.send({
          code: 401,
          mes: 'token error',
          data: {}
        })
        else {
          req.userName = decode.name
          next()
        }
      })
    }
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})



// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
