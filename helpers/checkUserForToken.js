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
            console.log(error)
        })

        console.log(userExist)

        return UserId
}

module.exports =  {checkUserForToken}
