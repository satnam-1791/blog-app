const {Schema, model} = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:'/public/images/profile.png'
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    }
},{timestamps:true});




userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hash = createHmac('sha512', salt).update(user.password).digest('hex');
     this.salt = salt;
     this.password =  hash; 
    next();
})


userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error('Invalid Email');
   const salt = user.salt;
   const hashPassword = user.password;
   const userprovidedHash = createHmac('sha512', salt).update(password).digest('hex');
   if( userprovidedHash == hashPassword){
    const token = createTokenForUser(user);
    return token;
   }
   if(userprovidedHash!== hashPassword){
    throw new Error('Invalid Password');
   }
})
const User = model('user', userSchema);
module.exports = User;



