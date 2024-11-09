const { validateToken } = require("../services/authentication");


const ValidateLoginCookie =(tokenName)=> {
return (req,res,next)=>{
  const token = req.cookies?.token;
  if(!token){
   return next();
  }
  if(token){
     const paylaod = validateToken(token);
     try {
        if(paylaod){
            req.user = paylaod;
         }
     } catch (error) {
         console.log(error);
     }
    return next()
    
    }
  }
}

module.exports = {ValidateLoginCookie};