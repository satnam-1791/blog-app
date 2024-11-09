const express = require('express');
const router = express.Router();
const {HandelSignUp,HandleSignIn, HandleSignOut} = require('../controllers/user');


router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/signup',HandelSignUp)
router.post('/signin',HandleSignIn)
router.get('/signout',HandleSignOut)
module.exports = router;