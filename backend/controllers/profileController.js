const Profile = require("../models/Profile"); // 🔥 FIXED NAME

exports.get = async (req, res) => {
    try {
        res.json(await Profile.findOne());
    } catch {
        res.status(500).json({ msg: "Error fetching profile" });
    }
};

exports.update = async (req, res) => {
    try {
        let p = await Profile.findOne();

        if (!p) {
            p = await Profile.create(req.body);
        } else {
            p = await Profile.findByIdAndUpdate(p._id, req.body, { new: true });
        }

        res.json(p);
    } catch {
        res.status(500).json({ msg: "Error updating profile" });
    }
};