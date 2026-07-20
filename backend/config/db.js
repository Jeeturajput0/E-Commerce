const mongoose=require("mongoose")
const connectDB =async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongoose are Connect successful");
        
    }catch(error){
console.log("mongoose are failed",error);

    }
}
module.exports=connectDB