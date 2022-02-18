const Auth = require('../Middlewares/Auth')

module.exports = app =>
{
	const Produto = require('../Controllers/ProdutosController')
	const router = require('express').Router()
  
	// Retorna todos os produtos disponiveis
	router.get('/', Auth, Produto.findAll)

	// Adiciona um produto
	router.post('/', Auth, Produto.create)

	// Exibe um produto especifico
	router.get('/:id', Auth, Produto.findOne)
	
	// Edita um produto
	router.put('/:id', Auth, Produto.edit)

	// Soft Delete
	router.delete('/:id', Auth, Produto.delete)

	app.use('/produtos', router)
}