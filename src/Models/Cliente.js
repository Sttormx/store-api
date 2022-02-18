module.exports = (connection, Sequelize) =>
{
	const Cliente = connection.define(
	'cliente',
		{
			nome:
			{
				type: Sequelize.STRING
			},

			cpf:
			{
				type: Sequelize.STRING
			}
		}
	)

	return Cliente
}
