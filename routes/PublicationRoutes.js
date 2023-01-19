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
                router.get('/mypubs', checkUserIsLogged, PublicationControllers.MyPubs)

                //editar pub
                router.get('/edit/:id', checkUserIsLogged, PublicationControllers.EditGet)

                //editar pub
                router.post('/edit', checkUserIsLogged, PublicationControllers.EditPost)

                //editar pub
                router.post('/delete', checkUserIsLogged, PublicationControllers.Delete)


module.exports = router