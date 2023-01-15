const { Schema } = require('mongoose')
const mongoose = require('../db/connDB')


const Publication = mongoose.model('Publication', new Schema({
    link:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required:true
    },
    createAt: {
        type:Date,
        default:Date.now
    }
}))

module.exports = Publication