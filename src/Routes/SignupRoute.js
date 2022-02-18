module.exports = app =>
{
	const Signup = require('../Controllers/SignupController')
	const router = require('express').Router()
  
	router.post("/", Signup.create)

	app.use('/signup', router)
}