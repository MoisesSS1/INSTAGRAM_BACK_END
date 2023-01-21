const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

async function checkUserIsLogged(req,res,next) {
    const Authorization = await req.headers.authorization

    //verifica se veio um token e valida se usuario existe
    if(Authorization){
        const token = await Authorization.split(' ')[1]
        const id = await jwt.decode(token)
        
        //checa se o do usuario existe e token é valido
        try{
            const userExist = await UserModel.findById(id)
            return next()  

        }catch(error){
            return res.status(422).json({message:"Houve um erro ao buscar usuario: "+error})
        }
    
    }else{
        //caso token não venha
        return res.status(422).json({message:"Favor, logar em uma conta"})

    }


}

module.exports = {checkUserIsLogged}