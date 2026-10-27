const mongoose=require("mongoose");
const User=require("./models/User");
require("dotenv").config();
const bcrypt=require("bcryptjs");

const createAdmin=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const username="Admin";
        const email="Admin@gmail.com";
        const password=process.env.ADMIN_PASSWORD;

        if(!password){
            throw new Error("Admin Password Required");
        }
        const existingAdmin=await User.findOne({email});
        if(existingAdmin){
            console.log("Admin Exists");
            return;
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            username,
            email,
            password:hashedPassword,
            role:"admin"
        });
        console.log("Admin Created Successfully");
    } catch (error) {
        console.log("Creating Admin Error",error.message)
    } finally{
        await mongoose.disconnect();
    }
}


createAdmin();