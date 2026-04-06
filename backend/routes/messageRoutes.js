const router=require("express").Router();
const c=require("../controllers/messageController");
const auth=require("../middleware/authMiddleware");

router.get("/",auth,c.get);
router.post("/",c.add);
router.delete("/:id",auth,c.delete);

module.exports=router;