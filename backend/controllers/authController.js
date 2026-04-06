const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await User.create({ email, password: hashed });

        res.json({ msg: "Registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({ msg: "Server error" });
    }
};