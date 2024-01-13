const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const blogSchema=Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('Blog',blogSchema)