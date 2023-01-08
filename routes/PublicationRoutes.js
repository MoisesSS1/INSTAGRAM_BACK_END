const router = require('express').Router()

//ver publicações
router.get('/', (req,res)=>{
    res.send('')
})

//editar publicações
router.patch('/edit', (req,res)=>{
    res.send('')
})

//busca de publicação especifica para editar
router.get('/public', (req,res)=>{
    res.send('')
})


//excluir public
router.delete('/', (req,res)=>{
    res.send('')
})

module.exports = router