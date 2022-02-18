module.exports = (connection, Sequelize) =>
{
	const Telefone = connection.define(
	'telefone',
		{
			numero:
			{
				type: Sequelize.STRING
			}
		}
	)

	return Telefone
}
