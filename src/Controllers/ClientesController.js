const Enums = require('../Models/Enums')
const Database = require('../Models/Database')
const { Cliente, Endereco, Telefone, Venda } = Database

// Retorna todos os clientes ordenados pelo ID
exports.findAll = (req, res) =>
{
	Cliente.findAll({
		order: [['id']]
	}).then(data =>
	{
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: error.message || 'Algum erro ocorreu durante a tentativa. Tente novamente mais tarde.' });
	})
}

// Adiciona um cliente
exports.create = (req, res) => 
{
	// É necessário validar se todos os principais dados foram informados
	if (!req.body.nome || !req.body.cpf) return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' });

	const cliente = 
	{
		nome: req.body.nome,
		cpf: req.body.cpf
	}

	Cliente.create(cliente).
	then(async data =>
	{	

		/*
		 * Os campos de enderecos e telefone são salvos em outra tabela no banco de dados
		 * Sao salvos em vazio nao nao sejam encontrados
		 */
		const endereco =
		{
			cep: req.body.cep || '',
			rua: req.body.cep || '',
			numero: req.body.cep || '',
			complemento: req.body.cep || '',
			bairro: req.body.cep || '',
			cidade: req.body.cep || '',
			estado: req.body.cep || '',
			// Foreign Key
			clienteId: data.id
		}
		await Endereco.create(endereco).then(EnderecoData =>
		{ data.dataValues.endereco = EnderecoData })
		
		const telefone =
		{
			telefone: req.body.telefone || '',
			clienteId: data.id
		}
		await Telefone.create(telefone).then(TelefoneData => 
		{ data.dataValues.telefone = TelefoneData })
		res.send(data)
	}).
	catch(error =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a criacao do cliente. Tente novamente mais tarde.'
		});
	})
}

// Encontra um cliente e retorna detalhadamente suas informacoes
exports.findOne = (req, res) =>
{
	const ID = parseInt(req.params.id, 10)

	if (ID)
	{
		Cliente.findByPk(ID).then(async data =>
		{
			if (data)
			{
				// Para detalhar um cliente, é necessário buscar nas demais tabelas com suas informações
				await Endereco.findOne({ where: { clienteId: ID } }).then(EndData =>
				{ 
					data.dataValues.endereco = EndData
				}) 	
				await Telefone.findOne({ where: { clienteId: ID } }).then(TelData =>
				{ 
					data.dataValues.telefone = TelData
				}) 	
				await Venda.findAll({ where: { clienteId: ID } }).then(VendaData =>
				{ 
					data.dataValues.vendas = VendaData
				})

				return res.send(data)
			}

			return res.status(Enums.BAD_REQUEST).send({ message: 'Usuario nao encontrado.' })
		}).
		catch(error => res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: error.message || 'Tente novamente mais tarde.' }))
		return;
	}

	return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos.' })
}

// Deleta somente os dados principais de um cliente
exports.edit = (req, res) =>
{
	const ID = req.params.id;

	Cliente.update(req.body, { where: { id: ID } }).
	then(num =>
	{
		// A variavel num retorna a quantidade de campos da tabela que foram alterados. Logo, se > 0 significado que o usuário foi alterado.
		const message = num > 0
			? 'Cliente atualizado com sucesso.'
			: 'Nao foi possivel atualizar o cliente. Verifique se informou os dados corretamente!';
		
		res.send({ message })
	}).
	catch(() =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: 'Um erro ocorreu. Tente novamente mais tarde.' })
	});
}

// Deleta um cliente e seus demais dados
exports.delete = (req, res) =>
{
	const ID = req.params.id;

	Cliente.destroy({ where: { id: ID } }).
	then(num =>
	{ 
		if (num == 1)
		{
			// Apaga todos os telefones, enderecos e vendas
			Endereco.destroy({ where: { clienteId: ID } })
			Telefone.destroy({ where: { clienteId: ID } })
			Venda.destroy({ where: { clienteId: ID } })

			res.send({ message: "Cliente deletado com sucesso." })
		}
		else
		{
			res.send({ message: 'Nao foi possivel deletar o cliente. Verifique se informou os dados corretamente!' })
		}
	}).
	catch(() =>
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({ message: 'Um erro ocorreu. Tente novamente mais tarde.' })
	});
}