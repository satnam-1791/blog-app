const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blogs');


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

router.post('/',upload.single('coverImage'),async(req,res)=>{
const {title, body} = req.body;
const data = await Blog.create({
    title,
    body,
    author:req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
})
return res.redirect(`/blog/${data._id}`);
})

module.exports = router;