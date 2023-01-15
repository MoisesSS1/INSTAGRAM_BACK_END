const jwt = require('jsonwebtoken')
const ObjectId = require ('mongoose'). Types.ObjectId;
const UserModel = require('../models/UserModel')

async function checkUserIsLogged(req,res,next) {
    const Authorization = await req.headers.authorization

    const token = await Authorization.split(' ')[1]
    
    const id = await jwt.decode(token)

    //checa se o do usuario existe e token é valido
    const userExist = await UserModel.findById(id)

    if(userExist){
        return next()  

    }else{
        return res.status(422).json({message:"Favor, logar em uma conta"})
    }
}

module.exports = {checkUserIsLogged}