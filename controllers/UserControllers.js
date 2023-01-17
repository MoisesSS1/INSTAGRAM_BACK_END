//models 
const UserModel  = require('../models/UserModel')
const bcript = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//helpers
const getToken = require('../helpers/getToken')



exports.Create = async (req,res)=>{
    const {name, password, email, phone} = req.body
    let user;

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

    //checar se email já é utilizado
    const checkUserExist = await UserModel.findOne({email,email})
    if(checkUserExist){
        return res.json({message:"O e-mail já pertence a um usuario, utilize outro!"})
    }

    //encriptografando senha
    var salt = await bcript.genSaltSync(process.env.BCRIPT_SAL)

    const passwordWash = await bcript.hash(password, salt)

    const userSave = {
        name,
        password:passwordWash,
        email,
        phone
    }

    

    try{
       const user = await UserModel.create(userSave)

       //gerando token de acesso
        const token = await getToken(user)
       
        return res.status(200).json({
            auth:true,
            token:token
        })

    } catch(error){
        return res.status(422).json({message:`Houve um erro: ${error}`})
    }      
    
}


exports.Login = async (req,res)=>{
    const {login,password} = req.body

    //recuperando dados do db 
    const user = await UserModel.findOne({email:login})

    let returnPassword;

        if(user){
            returnPassword = await bcript.compare(password,user.password)
        }
    

    if(!user){
        return res.status(404).json({message:"Email incorreto!"})
    }

    if(user && !returnPassword ){
        return res.status(403).json({message:"Senha incorreta!"})
    }

    if(user && returnPassword ){

        //gerando token
        const token = await getToken(user)
        return res.status(200).json({auth:true,token:token})
    }


    

}