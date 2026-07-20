
require("dotenv").config();
const express=require("express")
const app=express()
const connectDB=require("./config/db")
connectDB();
const PORT= process.env.PORT || 3000
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello sir ji")
})
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    
})