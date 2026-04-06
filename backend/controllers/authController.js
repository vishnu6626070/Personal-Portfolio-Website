const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{
 const {email,password}=req.body;
 const hashed=await bcrypt.hash(password,10);
 await User.create({email,password:hashed});
 res.json({msg:"Registered"});
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};