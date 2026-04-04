const mongoose =require("mongoose")

const skillSchema=new mongoose.Schema({
    name:String,
    level:Number
    
})
module.exports=mongoose.model("Skill",skillSchema);