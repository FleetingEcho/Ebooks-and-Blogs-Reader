const baseSchema = require('../base')
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('mdValue', Object.assign(baseSchema(DataTypes), {
		key: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'The key used to extract the file'
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'Title'
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'upload date'
		},
		time: {
			type: DataTypes.STRING,
			allowNull: true,
			column: 'upload exact time'
		},
		markdownContent: {
			type: DataTypes.TEXT,
			allowNull: true,
			column: 'content'
		},
		rateToday: {
			type: DataTypes.INTEGER,
			allowNull: true,
			column: 'reading time'
		},
	}), {
		tableName: 'mdValue',
		timestamps: true
	})
	// return mdValue
}
