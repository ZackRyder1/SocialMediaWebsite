const express = require('express');

const router  = express.Router();

const User = require('../Models/user');

const userController = require('../Controllers/userController');

const { body } = require('express-validator/check');

const isAuth = require('../Middleware/is_auth');

router.post('/signup',[
    body('username')
    .trim()
    .isLength({min : 3})
    .withMessage("Username should be atleast 3 characters long!!")
    .custom((value , {req}) =>{
        return User.findOne({username : value}).then((userDoc)=>{
            if(userDoc)
                return Promise.reject('Username Already exists!!');
        });
    }),
    body('email')
    .trim()
    .isEmail()
    .withMessage("Enter a correct email!!")
    .custom((value , {req}) =>{
        return User.findOne({email : value}).then((userDoc)=>{
            if(userDoc)
                return Promise.reject('Email Already exists!!');
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min : 8})
    .withMessage("Password should be 5 characters long!!")
    .isLength({max : 20})
],userController.signUp);

router.post('/login',userController.login);

router.post('/email',userController.checkEmail);

router.post('/username',userController.checkUsername);

router.post('/signOut',userController.signOut);

router.get('/isSignedIn',userController.checkAuth);

router.get('/info/:userId',userController.getUserInfo);

router.put('/addProfile',isAuth,userController.addProfile);

router.put('/follow/:userId',isAuth,userController.follow);

router.delete('/unfollow/:userId',isAuth,userController.unfollow);

router.get('/getFollowers/:userId',isAuth,userController.getFollowers);

router.get('/getFollowing/:userId',isAuth,userController.getFollowing);

router.get('/searchUser/:search',isAuth,userController.searchUser);

router.get('/isFollowed/:userId',isAuth,userController.isFollowed);


module.exports = router;