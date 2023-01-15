const PublicationModel = require('../models/PublicationModel')
const UserModel = require('../models/UserModel')

//helpers
const checkUserForToken = require('../helpers/checkUserForToken')

//Todos os posts
exports.Posts = async (req,res)=> {
    const posts = await PublicationModel.find({}).sort('-createAt')
    res.json({posts:posts})
}


exports.Create = async (req,res)=>{
    const {link, description} = req.body

    const Authorization = await req.headers.authorization
    const UserId = await Authorization.split(' ')[1]

    //validações
    if(!link || '' ||undefined || null){
        return res.status(422).json({message:"Preencha a imagem de forma correta"})
    }
    if(!description || '' ||undefined || null){
        return res.status(422).json({message:"Preencha a descrição de forma correta"})
    }
    if(!UserId || '' ||undefined || null){
        return res.status(422).json({message:"Entre em uma conta para adicionar o post!"})
    }



    try{
        const post = {
            link,
            description,
            UserId
        }
        const postSave = await PublicationModel.create(post)
        return res.status(422).json({message:"Post criado com sucesso!"})
    } catch(error){
       return res.status(404).json({message:`Houve um erro ao criar o post: ${error}`})
    }

}

