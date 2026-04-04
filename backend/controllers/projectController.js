const Project=require("../models/Project");
// add project
exports.addProject=async(req,res)=>{
    try{
        const project=new Project(req.body);
        await project.save();
        res.json(project);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}
//get all projects
exports.getProjects=async(req,res)=>{
    try{
        const projects= await Project.find();
        res.json(projects);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

