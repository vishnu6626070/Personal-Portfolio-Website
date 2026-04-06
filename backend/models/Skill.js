const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name:String,
  level:Number
});

module.exports = mongoose.model("Skill", schema);