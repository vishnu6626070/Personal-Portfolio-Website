const Skill = require("../models/Skill");

exports.get = async (req, res) => {
    try {
        res.json(await Skill.find());
    } catch {
        res.status(500).json({ msg: "Error fetching skills" });
    }
};

exports.add = async (req, res) => {
    try {
        res.json(await Skill.create(req.body));
    } catch {
        res.status(500).json({ msg: "Error adding skill" });
    }
};

exports.update = async (req, res) => {
    try {
        res.json(await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch {
        res.status(500).json({ msg: "Error updating skill" });
    }
};

exports.delete = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch {
        res.status(500).json({ msg: "Error deleting skill" });
    }
};