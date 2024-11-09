const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const cookieparser = require('cookie-parser');
const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');
const {connectDB} = require('./database/config');
const { ValidateLoginCookie } = require('./middleware/authentication');
const Blog = require('./models/blogs');

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(ValidateLoginCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async(req, res) => {
  const allBlogs = await Blog.find({}).sort({createdAt:-1});;
    res.render('home',{
      user:req.user,
      blogs:allBlogs,
    })
})

app.use('/user', UserRoute);
app.use('/blog', BlogRoute);

connectDB().then(() => {
    console.log("Success");
    app.listen(PORT, () => {
      console.log("RUNNING");
    });
  })
  .catch((err) => {
    console.log(err);
  });