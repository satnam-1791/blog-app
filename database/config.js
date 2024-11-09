const mongoose = require('mongoose')


const connectDB = async ()=>{
 await mongoose.connect('mongodb+srv://Thanos2024:Google123@alpha.iswff.mongodb.net/blogify')
}

module.exports = {connectDB}