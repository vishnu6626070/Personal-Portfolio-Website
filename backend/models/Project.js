const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title:String,
  description:String,
  github:String,
  image:String
},{timestamps:true});

module.exports = mongoose.model("Project", schema);