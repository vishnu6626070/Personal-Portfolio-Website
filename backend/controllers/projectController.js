const Project = require("../models/Project");

exports.get = async (req, res) => {
    try {
        const data = await Project.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching projects" });
    }
};

exports.add = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.json(project);
    } catch (error) {
        res.status(500).json({ msg: "Error adding project" });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ msg: "Error updating project" });
    }
};

exports.delete = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting project" });
    }
};