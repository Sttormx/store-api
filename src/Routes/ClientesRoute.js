const Auth = require('../Middlewares/Auth')

module.exports = app =>
{
	const Cliente = require('../Controllers/ClientesController')
	const router = require('express').Router()
  
	// Exibe todos os clientes ordenados pelo ID
	router.get('/', Auth, Cliente.findAll)

	// Exibe um cliente especifico pelo ID
	router.get('/:id', Auth, Cliente.findOne)

	// Cria um cliente
	router.post('/', Auth, Cliente.create)

	// Edita um cliente
	router.put('/:id', Auth, Cliente.edit)
	
	// Deleta um cliente
	router.delete('/:id', Auth, Cliente.delete)

	app.use('/clientes', router)
}