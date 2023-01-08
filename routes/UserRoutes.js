const router = require('express').Router()
const controllers = require('../controllers/UserControllers')


//Criação de conta
router.post('/create', controllers.CreateUserController)

//puxar os dados atuais da conta para editar
router.get('/edit', (req,res)=>{
    
})

//Salvar dados editados
router.post('/edit', (req,res)=>{
    res.send('')
})



//excluir conta

router.post('/edit/delete', (req,res)=>{
    res.send('')
})





module.exports = router