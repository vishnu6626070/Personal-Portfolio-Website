const Message = require("../models/Message");

exports.get = async (req, res) => {
    try {
        res.json(await Message.find().sort({ createdAt: -1 }));
    } catch {
        res.status(500).json({ msg: "Error fetching messages" });
    }
};

exports.add = async (req, res) => {
    try {
        res.json(await Message.create(req.body));
    } catch {
        res.status(500).json({ msg: "Error sending message" });
    }
};

exports.delete = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch {
        res.status(500).json({ msg: "Error deleting message" });
    }
};