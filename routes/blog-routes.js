const express=require("express")
const router=express.Router()


const blog=require("../controller/blog-controller")

router.get('/',blog.fetchBLog)

//router,get('/search/?search',blog.fetchBLog)

router.post('/add',blog.addBlog)

router.put('/update/:id',blog.updateBlog)

router.delete('/delete/:id',blog.deleteBlog)

module.exports=router
