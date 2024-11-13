const {Schema, model} = require('mongoose');


const commentSchema = new Schema({
    content: {
        type:String,
        required:true
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    blogId:{
            type:Schema.Types.ObjectId,
        ref:'blog'
    }


},{timestamps:true});


const Comment = model('comment', commentSchema);
module.exports = Comment;



