var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource')
})

router.get('/getUserInfo', function(req, res, next) {
  res.send('success')
})

router.get('/authorization', (req, res, next) => {
	const userName = req.userName
	// console.log(userName);
	// console.log(req);
  res.send({
    code: 200,
    mes: 'success',
    data: {
      token: jwt.sign({ name: userName }, 'abcd', {
        expiresIn: '1d'
      }),
      rules: {
        page: {
					Home: true,
					home:true,
					index:true,
					upload:true,
					blogs:true,
					// showMd:false,
					showMd:true,
					write:true,
					form:false,
					myBooks:true,
					Ebook:true,
					feelings:false,
					login:true,
					editBlog:true

        },
        component: {
          // edit_button: true,
          // publish_button: false
        }
      }
    }
  })
})

module.exports = router
