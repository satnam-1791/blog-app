
const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    yoyo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
     },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },

},{timestamps:true});


const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;