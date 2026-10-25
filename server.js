const express=require("express");
require("dotenv").config();
const registerRoutes=require("./routes/Register");
const Connect=require("./config/database");
const cors=require("./config/cors");
const auth=require("./Authentication/auth");
const loginRoutes=require("./routes/Login");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors);

Connect();

app.use("/api",registerRoutes);
app.use("/api",loginRoutes);


Port=process.env.PORT||8000;
app.listen(Port,()=>{
    console.log(`Server is running on Port ${Port}`);
})