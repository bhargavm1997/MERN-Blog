const mongoose=require("mongoose")
const Blog=require("../model/blog");
const blog = require("../model/blog");

//fetch a blog
//add a blog
//delete blog
//update a blog


const fetchBLog=async(req,res)=>{
    let blogList;
try{
    const {q}=req.query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
 /*   if(!q){
        console.log("ifff",!q)
       let search= await blog.find({title:{$regex:q,$options:'i'}}).exec()
       console.log(search)

    }
    else {
    console.log(q,"----query")
     blogList=await Blog.find()
    }*/

    if (q) {

        blogList= await blog.find({ title: { $regex: q, $options: 'i' } }).exec();
     
       
    } else {
       
        // Do something when q is empty
        blogList = await Blog.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      
    }
}
catch(err){
    console.log(err)
}
if(!blogList || blogList.length===0){
    return res.status(404).json({blogList})
}
return res.status(200).json({blogList})
}

const addBlog=async(req,res)=>{
    const {title,description}=req.body
    const currentDate=new Date()
    const newBlog=await blog({title,description,currentDate})
    try{
            await newBlog.save()
    }
    catch(err){
        console.log(err)
    }
    try{
       /* const session=await mongoose.startSession()
        session.startTransaction;
        await newBlog.save(session)
       await session.commitTransaction()*/
       const session = await mongoose.startSession();
       session.startTransaction();  // This line was missing
       await newBlog.save(session);
       await session.commitTransaction();
     
       session.endSession(); 
    }
    catch(err){
        console.log(err,"err---")
        return res.status(500).json({message:err})
    }
    return res.status(200).json(newBlog)

}

const deleteBlog=async(req,res)=>{
    const id=req.params.id
    try{
            const findBlog=await Blog.findByIdAndDelete(id)
            if(!findBlog){
                return res.status(404).json({message:"Blog Not Found"})
            }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({messgae:"Internal Server Error"})
    }
    return res.status(200).json({message:"Successfully Deleted"})
}

const updateBlog=async(req,res)=>{;

    const {title,description}=req.body
    const id=req.params.id
try{
    let blogUpdate=await Blog.findByIdAndUpdate(id,{title,description})
    if(!blogUpdate){
        return res.status(404).json({message:"Blog Not Updated"})
    }
    return res.status(200).json({blogUpdate})
}
catch(err){

}
}


module.exports={
fetchBLog,addBlog,deleteBlog,updateBlog
}