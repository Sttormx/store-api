const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const database = require('./src/Models/Database')

// A ORM precisa sincronizar a database em toda inicializacao
database.connection.sync()

// Express
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/*
 * -- Rotas --
 * As rotas sao definidas de forma automatica
 */
const routeFiles = fs.readdirSync('./src/Routes').filter(file => file.endsWith('.js'))
for (const route of routeFiles)
{
	require(`./src/Routes/${route}`)(app)
}

module.exports = app