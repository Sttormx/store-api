const Enums = require('../Models/Enums')
const Database = require('../Models/Database')
const { Produto } = Database

// Retorna todos os produtos ordenados pelo ID
exports.findAll = (req, res) =>
{
	// Todos os produtos nao deletados tem published = 1 (soft-delete)
	Produto.findAll({
		// Somente os publicados (soft delete)
		where: { published: 1 },
		// Ordem alfabetica
		order: [['nome', 'ASC']],
		// Somente os dados principais
		attributes: ['id', 'nome', 'preco']
	}).then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a tentativa. Tente novamente mais tarde.'
		});
	})
}

// Retorna um produto pelo ID
exports.findOne = (req, res) =>
{
	Produto.findOne({ where: { id: req.params.id, published: 1 } }).
	then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a tentativa. Tente novamente mais tarde.'
		});
	})	
}

// Cria um novo produto
exports.create = (req, res) => 
{
	// É necessário que todos os dados sejam inseridos
	if (!req.body.nome || !req.body.preco || !req.body.autor || !req.body.editora) return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' });

	const produto = 
	{
		nome: req.body.nome,
		preco: req.body.preco,
		autor: req.body.autor,
		editora: req.body.editora,
		// Soft delete
		published: 1
	}

	Produto.create(produto).
	then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a criacao do produto. Tente novamente mais tarde.'
		});
	})
}

// Atualiza um produto
exports.edit = (req, res) =>
{
	const ID = req.params.id;

	Produto.update(req.body, { where: { id: ID } }).
	then(num =>
	{
		// A variavel num retorna a quantidade de campos da tabela que foram alterados. Logo, se > 0 significado que o usuário foi alterado.
		const message = num > 0
			? 'Produto atualizado com sucesso.'
			: 'Nao foi possivel atualizar o produto. Verifique se informou os dados corretamente!';
		
		res.send({ message })
	}).
	catch(() =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: 'Um erro ocorreu. Tente novamente mais tarde.' })
	});
}

// Deleta um produto (soft-delete)
exports.delete = (req, res) =>
{
	const ID = req.params.id;

	Produto.update({ published: 0 }, { where: { id: ID } }).
	then(num =>
	{
		// A variavel num retorna a quantidade de campos da tabela que foram alterados. Logo, se > 0 significado que o usuário foi alterado.
		const message = num > 0
			? 'Produto atualizado com sucesso.'
			: 'Nao foi possivel atualizar o produto. Verifique se informou os dados corretamente!';
		
		res.send({ message })
	}).
	catch(() =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: 'Um erro ocorreu. Tente novamente mais tarde.' })
	});
}