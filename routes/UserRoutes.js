const router = require('express').Router()
const UserControllers = require('../controllers/UserControllers')

//public routes
        //Criação de conta
        router.post('/create', UserControllers.Create)

        //login
        router.post('/login', UserControllers.Login)

        //rota que retorna

module.exports = router