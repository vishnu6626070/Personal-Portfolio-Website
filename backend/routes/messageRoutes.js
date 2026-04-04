const express = require("express")
const router = express.Router()

const { sendMessage, getMessages } = require("../controllers/messageController")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/", sendMessage)
router.get("/",authMiddleware,getMessages)

module.exports = router