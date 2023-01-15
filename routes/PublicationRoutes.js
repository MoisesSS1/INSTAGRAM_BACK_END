const router = require('express').Router()
const PublicationControllers = require('../controllers/PublicationControllers')
const jwt = require('jsonwebtoken')

const ObjectId = require ('mongoose'). Types.ObjectId;

async function checkToken(req,res,next) {
    const Authorization = await req.headers.authorization

    const token = await Authorization.split(' ')[1]
    
    const checkUserToken = await jwt.decode(token)

    //checa se o do usuario é ObjectId válido
    const checkObjectId = await ObjectId.isValid(checkUserToken)

    if(checkObjectId){
        return next()  

    }else{
        return res.status(422).json({message:"Id de usuario nao existe!"})
    }

}

//ver todas as pub
router.get('/', checkToken, PublicationControllers.Posts)

//Criar pub
router.post('/create', checkToken, PublicationControllers.Create)

//editar pub



//busca de publicação especifica para editar



//excluir public


module.exports = router