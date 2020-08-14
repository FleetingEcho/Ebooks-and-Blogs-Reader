const saveFile = require('../util/save-file')
const readFile = require('../util/read-file')
const snowflake = require('../util/snowflake')
const getRelated= require('../util/getRelatedKey')
const {Op} =require('sequelize')
const  sd = require('silly-datetime')
module.exports = {
	// 获取文件
	async getFile (req, res) {
		const { key, type } = req.body
		if (!key) throw 'lost key'
		let fileInfo = await global.mysql.file_manage.findOne({
			where: {
				key
			}
		})
		const { path, file_name } = fileInfo.dataValues
		if (!path) throw 'not found this file'
		// console.log({ key, type, path })
		switch (type) {
		case 'download': {
			res.status(200).set({
				'Content-Type': 'text/html',
				'Content-Disposition': `attachment; filename=${encodeURI(file_name)}`
			}).download(path, file_name)
			break
		}
		// case 'text': {
		// 	let content = ''
		// 	// 使用了redis读取缓存
		// 	const redisContent = await global.redis.getAsync(`file_content_${key}`)
		// 	if (redisContent) content = redisContent
		// 	else content = await readFile(path, 'utf-8')
		// 	global.redis.set(`file_content_${key}`, content)
		// 	res.status(200).send(content)
		// 	break
		// }
		}
	},
	// Upload files
	async uploadFile (req, res) {
		let fileSaveRes = {}
		try {
			fileSaveRes = await saveFile(req)
		} catch (err) {
			//
		}
		const { size, path, name, type } = fileSaveRes
		const nameSplit = path.split('/')
		const save_name = nameSplit[nameSplit.length - 1]
		let insertRes = await global.mysql.file_manage.create({
			path,
			file_size: size,
			file_type: type,
			file_name: name,
			save_name,
			user: '1',
			key: snowflake()
		})
		res.json(insertRes)
	},
	async uploadMdValue (req, res) {

		const { title,date,markdownContent,rateToday} = req.body.data
		console.log(req.body);
		console.log(title,date,markdownContent,rateToday);
		let insertRes = await global.mysql.mdValue.create({
			key: snowflake(),
			title:title,
			date:date,
			time:sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') ,
			markdownContent:markdownContent,
			rateToday:rateToday
		})
		res.json(insertRes)
	},
	async editBlogs (req, res) {
		const { title,date,markdownContent,rateToday} = req.body.data.value
		console.log(req.body);
		const {userKey} =req.body.data
		console.log(userKey);
		let editVal = await global.mysql.mdValue.update({
				title:title,
				data:date,
				time:sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
				markdownContent: markdownContent,
				rateToday:rateToday
		},{
			where: {
				key:userKey
			}
		})
		res.json({
			status_code: 200,
			result:'Edited Successfully'
		})
	},


	async delBlogs (req, res) {
		console.log(req.body);
		const userKey=req.body.userKey
		if (!userKey) throw 'need unique key'
		let _res = global.mysql.mdValue.destroy({
			where: {
				key:userKey
			}
		})
		// console.log(_res);
		res.send(_res)
	},


	async fetchEbooks(req, res) {
		// console.log(req.body);
		const {clickPage,searchVal}=req.body
		const currentPage=clickPage
		const countPerPage=6
		const search=searchVal.trim()
		const searchCondition=`%${search}%`
		let total=await global.mysql.file_manage.count({
			where:{
				file_name:{
					[Op.and]: [
						{ [Op.like]: searchCondition },
						{ [Op.like]:'%epub' },
				]
				}
			}
		})
		// console.log('image numbers：'+total)
		let cb=await global.mysql.file_manage.findAll({
			where:{
			file_name:{
				[Op.and]: [
					{ [Op.like]: searchCondition },
					{ [Op.like]:'%epub' },
			]
			}
			},
			order:[
				['key','desc']
			],

			attributes:['file_name','key','updatedAt'],
			'limit':countPerPage,
			'offset':countPerPage*(currentPage-1)
		})
		let result=[];
		let result1=[];
		cb.forEach(element=>{
			result.push(element.dataValues)
		});
		result1.push([total])
		result1.push(result)
		res.json(result1)
	},
	async fetchMyBook (req, res) {
		//  const userKey="1284344162233225216"
		 const search=JSON.parse(JSON.stringify(req.body));
		const userKey=search.userKey
		// console.log(userKey);
		let cb=await global.mysql.file_manage.findAll({
			where:{
				key: userKey
				},
			order:[
				['key','desc']
			],
			attributes:['path'],
		})
		let result=[];
		cb.forEach(element=>{
			result.push(element.dataValues)
		});
		// console.log(result1);
		const filePath= result[0].path
		const index=filePath.indexOf('file_storage')  //37
		const path=filePath.substr(index)
		res.json(path)
	},



		// Get a list of all blogs---add a page
		async fetchBlogs (req, res) {
			const {clickPage,searchVal}=req.body
			const search=searchVal.trim()
				const searchContent=`%${search}%`
			// const currentPage=1
			const currentPage=clickPage
			const countPerPage=3
			let total=await global.mysql.mdValue.count({
								where:{
					title:{
						[Op.like]: searchContent
					}
					}
			})
			// console.log(total)
			let cb=await global.mysql.mdValue.findAll({
				where:{
					title:{
						[Op.like]: searchContent
					}
					},
				order:[
					['key','desc']
				],
				attributes:['title','date','key','time'],
				'limit':countPerPage,
				'offset':countPerPage*(currentPage-1)
			})
			let result=[];
			let result1=[];
			cb.forEach(element=>{
				result.push(element.dataValues)
			});
			result1.push([total])
			result1.push(result)
			// console.log(result1);
			res.json(result1)
		},

	// upload images
	async markdownImg (req, res) {
		let fileSaveRes = {}
		try {
			fileSaveRes = await saveFile(req)
		} catch (err) {
			//
		}
		const { size, path, name, type } = fileSaveRes
		const nameSplit = path.split('/')
		const save_name = nameSplit[nameSplit.length - 1]
		let insertRes = await global.mysql.file_manage.create({
			path,
			file_size: size,
			file_type: type,
			file_name: name,
			save_name,
			user: '1',
			key: snowflake()
		})
		// console.log(insertRes);
		res.json(insertRes)
	},
	// file list
	async getFileList (req, res) {

			// const search='Jake'
		const {clickPage,searchVal}=req.body

			const search=searchVal.trim()

				const searchContent=`%${search}%`
			// const currentPage=1
			const currentPage=clickPage
			const countPerPage=5
			let total=await global.mysql.file_manage.count({
								where:{
					file_name:{
						[Op.and]: [
							{ [Op.like]:'%epub'},
							{ [Op.like]: searchContent},
					 ]
					}
					}
			})
		let fileList = await global.mysql.file_manage.findAll({
			where: {
				// user: userId,
				file_name:{
					[Op.and]: [
						{ [Op.like]:'%epub'},
						{ [Op.like]: searchContent},
				 ]
				}
			},
			order:[
				['key','desc']
			],
			attributes:['key','file_name','file_type','file_size','createdAt'],
			'limit':countPerPage,
			'offset':countPerPage*(currentPage-1)
		})
		let result=[];
		let result1=[];
		fileList.forEach(element=>{
			result.push(element.dataValues)
		});
		result1.push([total])
		result1.push(result)

		// console.log(result1);
		res.send(result1)
	},

		// get markdown content
	async getMdValue (req, res) {
		const {userKey}=req.body
		// console.log(req)
		// const userKey='1284680844581146624'
		let userMdValue = await global.mysql.mdValue.findAll({
			where: {
				key:userKey
			},
			attributes: {
				exclude: ['id','key','createdAt','updatedAt']
			}
		})

		let cb= await global.mysql.file_manage.findAll({
			order:[
				['key','desc']
			],
			attributes:['key','id','file_name'],
		})
		let result=[];
		cb.forEach(element=>{
			result.push(element.dataValues)
		});
		getRelated(userKey,result).then((resolve)=>{
			res.json(resolve)
		}).catch((err)=>{console.log(err);})
		res.send(userMdValue)
	},

	// test
	async getThisMd (req, res) {
		const {userKey}=req.body
		// console.log(req);
		// const userKey='1284696065408372736'
		let userMdValue = await global.mysql.mdValue.findAll({
			where: {
				key:userKey
			},
			attributes:{
				exclude: ['id','createdAt','updatedAt']
			}
		})

		let cb= await global.mysql.mdValue.findAll({
			order:[
				['key','desc']
			],
			attributes:['key','id','title','time'],
		})
		let result=[];
		cb.forEach(element=>{
			result.push(element.dataValues)
		});
		getRelated(userKey,result).then((resolve)=>{
			userMdValue.push(resolve)
			res.json(userMdValue)
		}).catch((err)=>{console.log(err);})
		// res.send(userMdValue)
	},


	// delete files
	async deleteFile (req, res) {
		const { key } = req.body
		if (!key) throw 'need unique key'
		let _res = global.mysql.file_manage.destroy({
			where: {
				key
			}
		})
		res.send(_res)
	}
}
