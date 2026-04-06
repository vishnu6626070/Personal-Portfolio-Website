const router=require("express").Router();
const c=require("../controllers/projectController");
const auth=require("../middleware/authMiddleware");

router.get("/",c.get);
router.post("/",auth,c.add);
router.put("/:id",auth,c.update);
router.delete("/:id",auth,c.delete);

module.exports=router;