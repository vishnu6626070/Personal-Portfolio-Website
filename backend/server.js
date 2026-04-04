const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
const projectRoutes=require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes")
const messageRoutes = require("./routes/messageRoutes")
const authRoutes=require("./routes/authRoutes")



const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/projects",projectRoutes);
app.use("/api/skills",skillRoutes);
app.use("/api/contact",messageRoutes);
app.use("/api",authRoutes);

app.get('/',(req,res)=>{
    res.send("Portfolio API running");
});
const startServer=async()=>{
    await connectDB()
    app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})

}
startServer()
