const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

//verifica se token é valido

async function checkUserForToken (req) {
        const Authorization = await req.headers.authorization
        const token = await Authorization.split(' ')[1]
        
        const UserId = await jwt.decode(token)

        const userExist = await UserModel.find({_id:UserId})
        .then((data)=>{
            return data
        })
        .catch((error)=>{
            res.status(404).json({message:`Houve um erro no acesso do usuário, tente novamente mais tarde: ${error}`})
        })

        return UserId
}

module.exports =  {checkUserForToken}
