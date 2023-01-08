//models 
const UserModel  = require('../models/UserModel')
const bcript = require('bcrypt')



exports.CreateUserController = async (req,res)=>{
    const {name, password, email, phone} = req.body

    //validações de preenchimento
    if(!name || name==""||name==undefined || name.lenght<=1){
        res.json({message:"Preencha o nome corretamente!"})
    }
    if(!password || password==""||password==undefined || password.lenght<=1){
        res.json({message:"Preencha a senha corretamente!"})
    }
    if(!email || email==""||email==undefined || email.lenght<=1){
        res.json({message:"Preencha o email corretamente!"})
    }
    if(!phone || phone==""||phone==undefined){
        res.json({message:"Preencha o nome corretamente!"})
    }

    //checar se usuario existe
    const checkUserExist = await UserModel.findOne({email,email})
    if(checkUserExist){
        return res.json({message:"O e-mail já pertence a um usuario, utilize outro!"})
    }

    //encriptografando senha
    var salt = await bcript.genSaltSync(process.env.BCRIPT_SAL)

    const passwordWash = await bcript.hash(password, salt)

    const user = {
        name,
        password:passwordWash,
        email,
        phone
    }

    try{
       const userSave = await UserModel.create(user)
        return res.status(200).json({message:"Usuario cadastrado com sucesso"})

    } catch(error){

        return res.status(422).json({message:`Houve um erro: ${error}`})

    }
   
        

       
    
}