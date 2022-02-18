module.exports = (connection, Sequelize) =>
{
	const Endereco = connection.define(
	'endereco',
		{
			cep:
			{
				type: Sequelize.STRING
			},

			rua:
			{
				type: Sequelize.STRING
			},

			numero:
			{
				type: Sequelize.STRING
			},

			complemento:
			{
				type: Sequelize.STRING
			},

			bairro:
			{
				type: Sequelize.STRING
			},

			cidade:
			{
				type: Sequelize.STRING
			},

			estado:
			{
				type: Sequelize.STRING
			}
		}
	)

	return Endereco
}