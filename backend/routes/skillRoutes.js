const express =require("express");
const router=express.Router();
const {addSkill,getSkills}=require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware")
router.post('/',authMiddleware,addSkill);
router.get('/',getSkills);
module.exports=router;
