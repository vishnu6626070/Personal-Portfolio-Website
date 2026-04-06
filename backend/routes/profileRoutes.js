const router=require("express").Router();
const c=require("../controllers/profileController");
const auth=require("../middleware/authMiddleware");

router.get("/",c.get);
router.post("/",auth,c.update);

module.exports=router;