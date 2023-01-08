//models 
const UserModel  = require('../models/UserModel')



exports.CreateController = async (req,res)=>{

    const {name, password, email, phone} = req.body

    const user = {
        name,
        password,
        email,
        phone
    }



    try{
        
        UserModel.create(user)
        return res.status(200).json({message:`Usuario criado: ${user}`})

    } catch(error){

        return res.status(422).json({message:`Houve um erro: ${error}`})

    }
   
        

       
    
}