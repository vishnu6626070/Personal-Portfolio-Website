const mongoose=require("mongoose");

const schema=new mongoose.Schema({
 name:String,
 bio:String
});

module.exports=mongoose.model("Profile",schema);