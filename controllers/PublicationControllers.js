const UserModel = require('../models/UserModel')
const PublicationModel = require('../models/PublicationModel')


//helpers
const {checkUserForToken} = require('../helpers/checkUserForToken')

//Todos os posts
exports.Posts = async (req,res)=> {
    const posts = await PublicationModel.find({}).sort('-createAt')
    res.json({posts:posts})
}

//criar publicações
exports.Create = async (req,res)=>{

    const UserId = await checkUserForToken(req)
    const {link, description} = req.body

    //validações
    if(!UserId){
        return res.status(422).json({message:"Token inválido!"})
    }
    if(!link || '' ||undefined || null){
        return res.status(422).json({message:"Preencha a imagem de forma correta"})
    }
    if(!description || '' ||undefined || null){
        return res.status(422).json({message:"Preencha a descrição de forma correta"})
    }
    if(!UserId || '' ||undefined || null){
        return res.status(422).json({message:"Entre em uma conta para adicionar o post!"})
    }

    const post = {
        link,
        description,
        UserId
    }

    try{
        //salva post no DBposts e salva id do posto no DBuser
        const postSave = await PublicationModel.create(post)
        const userSavePost = await UserModel.updateOne({_id:UserId}, {$push: {publicationId:postSave._id.toString()}})

        console.log(userSavePost)
        return res.status(422).json({message:"Post criado com sucesso!"})

    } catch(error){
       return res.status(422).json({message:`Houve um erro ao criar o post: ${error}`})
    }

}

//mostrar minhas publicações
exports.MyPubs = async (req,res)=>{

    const UserId = await checkUserForToken(req)
    try{
        const Mypubs = await PublicationModel.find({UserId:UserId})
        return res.status(200).json({data:Mypubs})
    }catch(error){
       return res.status(422).json({message:`Houve um erro ao buscar suas publicações: ${error}`})
    }
}

//dados individuais para editar pub
exports.EditGet = async (req,res)=>{
    const id = req.params.id

    try{
        const pubData = await PublicationModel.findById(id)
        return res.status(200).json({data:pubData})
    }catch(error){
        return res.status(422).json({message:`Houve um erro ao buscar dados da publicação: ${error}`})
    }   
}



