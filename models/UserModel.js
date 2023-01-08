const mongoose = require('../db/connDB')


const UserModel = mongoose.model('User', {
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

})

module.exports = UserModel

