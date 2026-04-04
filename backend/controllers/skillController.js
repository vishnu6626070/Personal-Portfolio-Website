const Skill=require("../models/Skill");
exports.addSkill=async(req,res)=>{
    try{
        const skill=new Skill(req.body);
        await skill.save();
        res.json(skill);
    }catch(error){
        res.status(500).json({error:error.message});
    }

}
exports.getSkills=async(req,res)=>{
    try{
        const skills=await Skill.find();
        res.json(skills);


    }catch(error){
        res.status(500).json({error:error.message});
    }
}