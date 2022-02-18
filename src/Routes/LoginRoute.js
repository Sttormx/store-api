module.exports = app =>
{
    const Login = require('../Controllers/LoginController')
    const router = require('express').Router()
  
    router.post("/", Login.login)

    app.use('/login', router)
};