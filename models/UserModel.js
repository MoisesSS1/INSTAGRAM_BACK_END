const mongoose = require('../db/connDB')
const { Schema } = require('mongoose')


const UserModel = mongoose.model('User',new Schema( {
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    publicationId:{
        type:Array
    }

}))

module.exports = UserModel

