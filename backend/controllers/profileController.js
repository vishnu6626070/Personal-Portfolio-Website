const Profile=require("../models/profile");

exports.get=async(req,res)=>{
 res.json(await Profile.findOne());
};

exports.update=async(req,res)=>{
 let p=await Profile.findOne();
 if(!p) p=await Profile.create(req.body);
 else p=await Profile.findByIdAndUpdate(p._id,req.body,{new:true});
 res.json(p);
};