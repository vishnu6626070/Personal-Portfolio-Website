const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, deleteMessage } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", sendMessage);
router.get("/", authMiddleware, getMessages);
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;