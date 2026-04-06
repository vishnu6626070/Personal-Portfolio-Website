const Skill=require("../models/Skill");

exports.get=async(req,res)=>{
 res.json(await Skill.find());
};

exports.add=async(req,res)=>{
 res.json(await Skill.create(req.body));
};

exports.update=async(req,res)=>{
 res.json(await Skill.findByIdAndUpdate(req.params.id,req.body,{new:true}));
};

exports.delete=async(req,res)=>{
 await Skill.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};