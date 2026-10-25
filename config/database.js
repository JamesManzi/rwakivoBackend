const mongoose=require("mongoose");
require("dotenv").config();

const Connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database Error",error);
        process.exit();
    }
}

module.exports=Connect;