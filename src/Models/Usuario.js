module.exports = (connection, Sequelize) =>
{
    const Usuario = connection.define(
    'usuario',
        {
            email:
            {
                type: Sequelize.STRING
            },

            senha:
            {
                type: Sequelize.STRING
            }
        }
    )

    return Usuario
}