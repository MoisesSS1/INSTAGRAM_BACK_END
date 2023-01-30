//modulos
const express = require('express')
require('dotenv').config()
const cors = require('cors');

//app
const app = express()
//port
const port = process.env.PORT

//rotas
const UserRoutes = require('./routes/UserRoutes')
const PublicationRoutes = require('./routes/PublicationRoutes')



//middlewares
app.use(express.json())
app.use(cors(''))


//rotas
app.use('/user', UserRoutes)
app.use('/post', PublicationRoutes)




app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})