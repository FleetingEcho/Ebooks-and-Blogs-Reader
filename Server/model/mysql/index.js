const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const path = require('path')
// const mysqlConfig = require('../../config/mysql')
// const { host, port, username, password } = mysqlConfig

// const sequelize = new Sequelize('fss', 'root', '1234', {
const sequelize = new Sequelize('fss', 'root', '', {
	host:'localhost',
	// host:'54.255.184.108',
	// host:'172.31.45.253',
	port:3306,
	dialect: 'mysql',
	logging: false,
	operatorsAliases: {
		$and: Op.and,
		$or: Op.or,
		$eq: Op.eq,
		$gt: Op.gt,
		$lt: Op.lt,
		$lte: Op.lte,
		$like: Op.like
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
})

const db = {}

fs.readdirSync(path.join(__dirname, './schema')).filter(filename => {
	return filename.indexOf('.') !== 0
}).forEach(filename => {
	const model = require(path.join(__dirname,'./schema/', filename))(sequelize, Sequelize)
	db[model.name] = model
})

sequelize.authenticate().then(err => {
	if (err) console.log(err)
	console.log('Mysql successfully connected'.cyan)
}).catch(err => {
	console.log('failed to connect Mysql: '.red, err)
})

sequelize.sync({
	hooks : true
}).then(() => {
	console.log('Successfully synchronized Mysql database'.cyan)
}).catch(() => {
	console.log('Failed to synchronized Mysql database'.red)
})

db.sequelize = sequelize

module.exports = db
