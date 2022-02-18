module.exports = (connection, Sequelize) =>
{
	const Venda = connection.define('venda', {})
	return Venda
}