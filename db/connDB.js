const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.te228dk.mongodb.net/?retryWrites=true&w=majority`)

module.exports = mongoose