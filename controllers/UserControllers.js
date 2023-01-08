//models 
const UserModel  = require('../models/UserModel')



exports.CreateController = async (req,res)=>{
    const {name, password, email, phone} = req.body

    //validações

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