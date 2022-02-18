const Auth = require('../Middlewares/Auth')

module.exports = app =>
{
	const Venda = require('../Controllers/VendasController')
	const router = require('express').Router()
  
	router.post("/", Auth, Venda.create)

	app.use('/vendas', router)
};