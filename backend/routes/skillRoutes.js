const express = require("express");
const router = express.Router();
const { addSkill, getSkills, updateSkill, deleteSkill } = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getSkills);
router.post("/", authMiddleware, addSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
