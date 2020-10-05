const express = require('express');

const router = express.Router();

const { body } = require('express-validator/check');

const feedController = require('../Controllers/feedController');

const isAuth = require('../Middleware/is_auth');

router.get('/posts',isAuth,feedController.getPosts);

router.get('/post/:postId',isAuth,feedController.getPost);

router.post('/create',isAuth,[
    body('caption')
    .trim()
    .isLength({min :5})
    .withMessage("Minimum Character is 5")
],feedController.createPost);

router.put("/update/:postId",isAuth,[
    body('caption')
    .trim()
    .isLength({min :3})
    .withMessage("Minimum Character is 5")
],feedController.updatePost);

router.delete("/delete/:postId",isAuth,feedController.deletePost);

router.get("/userPost/:userId",isAuth,feedController.getUserPost);

router.put("/like/:postId",isAuth,feedController.like);

router.delete("/dislike/:postId",isAuth,feedController.dislike);

router.put("/comment/:postId",isAuth,feedController.comment);

router.get("/getComments/:postId",isAuth,feedController.getComments);

router.get("/getLikes/:postId",isAuth,feedController.getLikes);

router.get("/isLiked/:postId",isAuth,feedController.isLiked);

router.get("/feedPosts",isAuth,feedController.getFeedPost);

// router.put("/deleteComment/:postId",isAuth,feedController.dislike);  Implement Later




module.exports = router;