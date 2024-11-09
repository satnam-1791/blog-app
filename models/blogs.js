const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");
const blogSchema = new Schema({
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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},{timestamps:true});


const Blog = model('blog', blogSchema);

module.exports = Blog;