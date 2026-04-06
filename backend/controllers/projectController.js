const Project=require("../models/Project");

exports.get=async(req,res)=>{
 res.json(await Project.find().sort({createdAt:-1}));
};

exports.add=async(req,res)=>{
 res.json(await Project.create(req.body));
};

exports.update=async(req,res)=>{
 res.json(await Project.findByIdAndUpdate(req.params.id,req.body,{new:true}));
};

exports.delete=async(req,res)=>{
 await Project.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};