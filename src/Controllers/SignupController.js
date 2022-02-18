const Enums = require('../Models/Enums')
const Database = require('../Models/Database')
const { Usuario } = Database

// Regex para validacao do e-mail
const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const validateEmail = email => regEmail.test(email) 

// Regex para validacao da senha
const regSenha = /^[0-9a-zA-Z$*&@#]{8,}$/
const validateSenha = pwd => regSenha.test(pwd) 

exports.create = async (req, res) =>
{
	try
	{
		// É necessário verificar se foram informados os dados corretamente 
		if (req.body.email && req.body.senha)
		{
			// O email deve estar no formato correto
			if (!validateEmail(req.body.email)) return res.status(Enums.BAD_REQUEST).send({ message: 'E-mail informado incorretamente.' })
			
			// A senha deve estar corretamente definida
			if (!validateSenha(req.body.senha)) return res.status(Enums.BAD_REQUEST).send({ message: 'Senha informada incorretamente.' })

			/*
			 * É necessário verificar se o e-mail já foi registrado
			 * TO-DO
			 */

			// Adiciona um novo usuario
			const usuario = 
			{
				email: req.body.email,
				senha: req.body.senha
			}

			Usuario.create(usuario).
			then(data =>
			{
				res.send(data)
			}).
			catch(error => res.status(Enums.INTERNAL_SERVER_ERROR).send({
				message: error.message || 'Algum erro ocorreu durante a criacao do usuario. Tente novamente mais tarde.'
			}))

			return
		}	

		return res.status(Enums.BAD_REQUEST).send({ message: 'Dados invalidos!' })
	}
	catch (error)
	{
		res.status(Enums.INTERNAL_SERVER_ERROR).send({
			message: error.message || 'Algum erro ocorreu durante a criacao do usuario. Tente novamente mais tarde.'
		})	
	}	
}