const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blogs');
const Comment = require('../models/comment');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads/'))
    },
    filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
     cb(null, fileName);
    }
  })
const upload = multer({ storage: storage });

router.get('/add-new',(req,res)=>{
return res.render('addblog',{
    user: req.user,
})
})


router.post('/comment/:blogId',async (req,res)=>{
  console.log("hiiiiiii====.",req.body)
  await Comment.create({
    content:req.body.content,
      blogId:req.params.blogId,
      createdby:req.user.id
    })
    return res.redirect(`/blog/${req.params.blogId}`);
  })

router.post('/',upload.single('coverImage'),async(req,res)=>{
const {title, body} = req.body;
const data = await Blog.create({
    title,
    body,
    yoyo:req.user.id,
    coverImage: `/uploads/${req.file.filename}`,
})

return res.redirect(`/blog/${data._id}`);
})


router.get('/:id',async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('yoyo');
  const comment = await Comment.find({blogId:req.params.id}).populate('createdby');
  console.log("CC",comment)
  return res.render('blog',{
    blog,
    user:req.user,
    comment,
  })

})




module.exports = router;