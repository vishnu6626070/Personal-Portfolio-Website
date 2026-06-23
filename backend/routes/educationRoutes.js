const express = require("express");
const router = express.Router();
const { getEducation, addEducation, updateEducation, deleteEducation } = require("../controllers/educationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getEducation);
router.post("/", authMiddleware, addEducation);
router.put("/:id", authMiddleware, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

module.exports = router;
