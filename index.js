//modulos
const express = require('express')
require('dotenv').config()


//rotas
const UserRoutes = require('./routes/UserRoutes')
const PublicationRoutes = require('./routes/PublicationRoutes')

//app
const app = express()

//port
const port = process.env.PORT


//middlewares
app.use(express.json())

app.use('/user', UserRoutes)
app.use('/publication', PublicationRoutes)




app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})