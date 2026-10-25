const express=require("express");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const router=express.Router();

router.post("/register",async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({
                success:false,
                message:"User Exists Try Again"
            })
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email.trim())){
            return res.status(400).json({
                success:false,
                message:"Invalid Email Try Again"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const createdUser=await User.create({
            username,
            email,
            password:hashedPassword
        });

        res.status(200).json({
            success:true,
            createdUser,
            message:"User Created Successfully"
        })
    } catch (error) {
        console.log("Register Error",error);
        return res.status(500).json(
            {
              success:false,
            message:"Register Error"  
            }
        )
    }
})

module.exports=router;