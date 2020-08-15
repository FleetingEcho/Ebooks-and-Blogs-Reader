var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
var path = require('path')
const indexController = require('../controller/index')


const getPasswordByName = (name) => {
  return { password: 'JaKe!cA1i' }
}


router.get('/file_storage/*', function(req, res) {
	let rootPath = path.resolve(__dirname,'..');
	// let rootPath = path.resolve(__dirname);
	const imageUrl=rootPath + "\\" + req._parsedOriginalUrl.path
	// const dirname=`../${__dirname}`
	console.log('the image path is'+imageUrl);
	res.sendFile(imageUrl);
});
router.get('/images/*', function(req, res) {
	let rootPath = path.resolve(__dirname,'..');
	// let rootPath = path.resolve(__dirname);
	const imageUrl=rootPath + "\\" + req._parsedOriginalUrl.path
	// const dirname=`../${__dirname}`
	res.sendFile(imageUrl);
});

router.get('/getDataAction', function(req, res, next) {
  res.status(200).send({
    code: 200,
    data: {
      name: 'jake'
    }
  })
});
router.post('/index/login', function(req, res, next) {
	const { userName, password } = req.body
	if (userName) {
		const userInfo = password ? getPasswordByName(userName) : ''
		if (!userInfo || !password || userInfo.password !== password) {
			res.status(401).send({
				code: 401,
				mes: 'user name or password is wrong',
				data: {}
			})
		} else {
			res.send({
				code: 200,
				mes: 'success',
				data: {
					token: jwt.sign({ name: userName }, 'abcd', {
						expiresIn: '1d'
					})
				}
			})
		}
	} else {
		res.status(401).send({
			code: 401,
			mes: 'user name is empty',
			data: {}
		})
	}
});


router
	.post('/upload_file', indexController.uploadFile)
	.delete('/delete_file', indexController.deleteFile)


module.exports = router
