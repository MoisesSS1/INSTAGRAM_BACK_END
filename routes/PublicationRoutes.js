const router = require('express').Router()
const PublicationControllers = require('../controllers/PublicationControllers')

//checa se usuario esta logado, rotas privadas
const {checkUserIsLogged} = require('../helpers/checkUserIsLogged')

//private routes 
                //ver todas as pub
                router.get('/', checkUserIsLogged, PublicationControllers.Posts)

                //Criar pub
                router.post('/create', checkUserIsLogged, PublicationControllers.Create)

                //listar minhas pubs
                router.post('/mypubs', checkUserIsLogged, PublicationControllers.MyPubs)

                //editar pub
                router.post('/edit/:id', checkUserIsLogged, PublicationControllers.Edit)


module.exports = router