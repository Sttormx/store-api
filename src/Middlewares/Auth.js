const JWT = require('jsonwebtoken')
const Enums = require('../Models/Enums')

module.exports = (req, res, next) =>
{
	const token = req.headers['x-access-token'];
	if (!token) return res.status(Enums.BAD_REQUEST).json({ auth: false, message: 'É necessário estar autenticado para acessar esta rota.' });

	JWT.verify(token, process.env.secret, (error, decode) =>
	{
		if (error) return res.status(Enums.BAD_REQUEST).json({ auth: false, message: 'Token nao autorizado.' });

		// O ID do usuario decodificado sera salvo para uso posterior
		req.userID = decode.id
		next()
	})
}