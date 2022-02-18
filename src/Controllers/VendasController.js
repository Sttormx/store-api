const Enums = require('../Models/Enums')
const Database = require('../Models/Database')
const { Venda } = Database

exports.create = (req, res) =>
{
	// É necessário verificar se todos os dados foram informados corretamente
	if (!req.body.produtoID || !req.body.clienteID) return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' });

	const venda =
	{
		produtoId: req.body.produtoID,
		clienteId: req.body.clienteID
	}
	
	// Adiciona uma venda
	Venda.create(venda).
	then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a criacao do usuario. Tente novamente mais tarde.'
		});
	})
}