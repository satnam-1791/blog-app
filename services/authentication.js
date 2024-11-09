const jwt = require('jsonwebtoken');
const secret = 'Haha@99';

const createTokenForUser = (user)=>{
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
    }, secret);
    return token;
}

const validateToken = (token)=>{
const payload = jwt.verify(token,secret);
return payload;
}
module.exports = {createTokenForUser,validateToken};