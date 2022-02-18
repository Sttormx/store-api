const Sequelize = require('sequelize');
require('dotenv').config()

const cfg = process.env
const Database = {}

//
Database.Sequelize = Sequelize

// Inicia a conexao com a database
Database.connection = new Sequelize(cfg.DB_DATABASE, cfg.DB_USERNAME, cfg.DB_PASSWORD, {
	host: cfg.DB_HOST,
	dialect: cfg.DB_CONNECTION
})

// Define todas as tabelas
Database.Usuario = require('./Usuario')(Database.connection, Sequelize)
Database.Cliente = require('./Cliente')(Database.connection, Sequelize)
Database.Endereco = require('./Endereco')(Database.connection, Sequelize)
Database.Telefone = require('./Telefone')(Database.connection, Sequelize)
Database.Produto = require('./Produto')(Database.connection, Sequelize)
Database.Venda = require('./Venda')(Database.connection, Sequelize)

// Foreign Keys
Database.Endereco.belongsTo(Database.Cliente)
Database.Telefone.belongsTo(Database.Cliente)
Database.Venda.belongsTo(Database.Cliente)
Database.Venda.belongsTo(Database.Produto)

module.exports = Database