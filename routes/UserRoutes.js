const router = require('express').Router()
const UserControllers = require('../controllers/UserControllers')

//public routes
        //Criação de conta
        router.post('/create', UserControllers.Create)

        //login
        router.post('/login', UserControllers.Login)




//private routes
        //puxar os dados atuais da conta para editar
        router.get('/edit', (req,res)=>{
                
        })

        //Edit
        router.post('/edit', (req,res)=>{
             res.send('')
        })

        //delete accont
        router.post('/edit/delete', (req,res)=>{
                res.send('')
        })





module.exports = router