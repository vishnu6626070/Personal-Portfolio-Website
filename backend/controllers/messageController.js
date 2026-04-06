const Message=require("../models/Message");

exports.get=async(req,res)=>{
 res.json(await Message.find().sort({createdAt:-1}));
};

exports.add=async(req,res)=>{
 res.json(await Message.create(req.body));
};

exports.delete=async(req,res)=>{
 await Message.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};