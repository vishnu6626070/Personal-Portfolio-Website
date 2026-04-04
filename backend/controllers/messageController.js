const Message=require("../models/Message")
exports.sendMessage=async(req,res)=>{
    try {
        const message = new Message(req.body)
        await message.save()
        res.json({ message: "Message saved successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.json(messages)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}