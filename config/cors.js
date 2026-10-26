const cors=require("cors");

const allowed_origins=process.env.ALLOWED_ORIGINS
?process.env.ALLOWED_ORIGINS.split(" ").map(origin=>origin.trim())
:["http://localhost:5173"];

const corsOption={
    origin:function(origin,callback){
        if(!origin){
            return callback(null,true);
        };
        if(allowed_origins.includes(origin)){
            return callback(null,true);
        };
        console.log("Blocked Origin",origin);

        return callback(new Error("Not Allowed By Cors"));
    },
    methods:['PUT','POST','GET','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type,Authorization'],
    credentials:true
}

module.exports=cors(corsOption);