const express = require("express");
const router = express.Router();
const { addProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getProjects);
router.post("/", authMiddleware, addProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;