const express = require("express");
const router = express.Router();
const { getSettings, updateSettings, incrementVisits } = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getSettings);
router.put("/", authMiddleware, updateSettings);
router.post("/visit", incrementVisits);

module.exports = router;
