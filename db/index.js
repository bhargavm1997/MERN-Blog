const mongoose=require("mongoose")

mongoose.set('strictQuery',false)

mongoose.connect('mongodb+srv://bsmudrakol:bhargav@cluster0.quzlysm.mongodb.net/').then(()=>{
    console.log("Database connection Established")
}).catch((err)=>{
    console.log(err)
})