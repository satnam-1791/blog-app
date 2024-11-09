const User = require('../models/user');


const HandelSignUp = async(req,res)=>{
    console.log(req.body);
 const {fullName,email,password} = req.body;
 const USER =   await User.create({fullName,email,password})
 return res.redirect('/');
}


const HandleSignIn = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPassword(email,password)
        return  res.cookie("token",token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:"Wrong Email or Password"
        });
    }

} 

const HandleSignOut = (req,res)=>{
    return res.clearCookie('token').redirect('/');
}

module.exports = {HandelSignUp,HandleSignIn,HandleSignOut};