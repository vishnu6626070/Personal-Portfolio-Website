const mongoose = require("mongoose")
const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("User",schema)