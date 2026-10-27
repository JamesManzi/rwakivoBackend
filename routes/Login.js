const express=require("express");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const router=express.Router();
const jwt=require("jsonwebtoken");

router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        const token=jwt.sign(
            {
                userId:user._id,
                role:user.role

            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )

        res.status(200).json({
            success:true,
            user:{
                username:user.username,
                email:user.email,
                role:user.role
            },
            token,
            message:"Login Successfully"
        })
    } catch (error) {
        console.log("Login Error",error);
        return res.status(500).json({
            success:false,
            message:"Login Error"
        })
    }
})


module.exports=router;