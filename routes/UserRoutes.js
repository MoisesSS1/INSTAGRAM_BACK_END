const router = require('express').Router()


//Criação de conta
router.post('/createAccount', (req,res)=>{
    const {name,password,email,phone} = req.body
    
})

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