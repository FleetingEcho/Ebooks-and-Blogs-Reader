var express = require('express')
var router = express.Router()
const indexController = require('../controller/index')
router.post('/formData1', function (req, res, next) {
  console.log(req.body)
  if (req.body.name !== 'jake') {
    res.status(200).send({
      name: 'the name is wrong'
    })
	} else res.send('success')
	res.send({
		code: 200,
		mes: 'success',
		data: {
		info:'Successfully uploaded'
		}
	});
})

router.post('/markdown', indexController.markdownImg)
router.post('/formData' ,indexController.uploadMdValue)
router.post('/editBlogs' ,indexController.editBlogs)
router.post('/delBlogs' ,indexController.delBlogs)
router.post('/getMdVal/:id' ,indexController.getMdValue )
// router.get('/fetchAllData' ,indexController.fetchAllData )
router.post('/fetchEbooks' ,indexController.fetchEbooks )
router.post('/fetchBlogs' ,indexController.fetchBlogs )
// router.get('/fetchBlogs1' ,indexController.fetchBlogs1 )
router.post('/getThisMd' ,indexController.getThisMd )
router.post('/getFileList', indexController.getFileList)
router.post('/getFile', indexController.getFile)
router.post('/fetchMyBook' ,indexController.fetchMyBook )
module.exports = router
