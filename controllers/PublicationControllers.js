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
    const _id = req.params.id

    try{
        const pubData = await PublicationModel.findById(_id)
        return res.status(200).json({data:pubData})
    }catch(error){
        return res.status(422).json({message:`Houve um erro ao buscar dados da publicação: ${error}`})
    }   
}

//Salvar edições do usuario editar publicação
exports.EditPost = async (req,res)=>{
    const UserId = await checkUserForToken(req)

    const {link, description, _id} = req.body
    const postUpdate = {
        link,
        description
    }

    try{
        //busca o id da pub, para ver se realmente existe
        const pubData = await PublicationModel.findById(_id)
        
        //valida se user da pub é o mesmo do idUser logado
        
        if(pubData && pubData.UserId!==UserId){
            return res.status(422).json({message:"Publicação não poder ser editada, pois não é sua!"})
        }

        if(!link || '' ||undefined || null){
            return res.status(422).json({message:"Preencha a imagem de forma correta!"})
        }
        if(!description || '' ||undefined || null){
            return res.status(422).json({message:"Preencha a descrição de forma correta!"})
        }

                    try{
                        const pub = await PublicationModel.findOneAndUpdate({_id,_id},postUpdate)
                        return res.status(422).json({message:"Dados atualizados com sucesso!!"})
                    }catch(error){
                        return res.status(422).json({message:`Houve um erro ao buscar suas publicações: ${error}`})
                    }
                    
         }catch(error){
            return res.status(422).json({message:`Houve um erro ao buscar dados da publicação: ${error}`})
         }   
}

exports.Delete = async (req,res)=>{
    const {_id} = req.body
    const UserId = await checkUserForToken(req)
    
        //busca o id da pub, para ver se realmente existe

        try{
            const pubData = await PublicationModel.findById(_id)
            //valida se user da pub é o mesmo do idUser logado
                if(pubData.UserId && pubData.UserId!== UserId){
                    return res.status(422).json({message:"Publicação não poder ser excluida, pois não é sua!"})
                }
                try{
                    await PublicationModel.deleteOne({_id:_id})
                    return res.status(200).json({message:"Publicação excluida com sucesso!"})
                }catch(error){
                    return res.status(422).json({message:`Houve um erro ao excluir publicação: ${error}`})
                } 

        }catch(error){
            return res.status(422).json({message:"Erro ao buscar publicação, provavelmente já foi excluida!"})
        }
        

        
        

}

