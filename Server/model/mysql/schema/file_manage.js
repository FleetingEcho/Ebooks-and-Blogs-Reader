const baseSchema = require('../base')
// const sequelize = require('index.js').sequelize;
// const DataTypes = require('mysql');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('file_manage', Object.assign(baseSchema(DataTypes), {
		key: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'The key used to extract the file'
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'File save path'
		},
		file_name: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'Original file name'
		},
		file_type: {
			type: DataTypes.STRING,
			allowNull: true,
			column: 'File type, usually a suffix name'
		},
		file_size: {
			type: DataTypes.INTEGER,
			allowNull: true,
			column: 'file size'
		},
		save_name: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'save name'
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
			column: 'user ID'
		},
		storage_time: {
			type: DataTypes.INTEGER,
			allowNull: true,
			column: 'File type, usually a suffix name'
		}
	}), {
		tableName: 'file_manage',
		timestamps: true
	})
}
