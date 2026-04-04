const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
//register

exports.register=async(req,res)=>{
    try {

        const { email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword
        })

        await user.save()

        res.json({ message: "Admin registered successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//login 

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token=jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        )
        res.json({token})

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
