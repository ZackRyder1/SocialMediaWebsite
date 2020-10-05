const { validationResult } = require('express-validator/check');

const bcrpyt = require('bcryptjs');

const User = require('../Models/user');

const jwt = require('jsonwebtoken');

const userError = require('../Error_handling/user_error');

const fileHelper = require('../util/deleteImage');

var mongoose = require('mongoose');



exports.signUp = (req,res,next) =>{
    const errors = validationResult(req);

    userError.validation(errors);

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrpyt.hash(password,12)
    .then(hashpw =>{
        const user = new User({
            email:email,
            username:username,
            password:hashpw,
            profileURL:"https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png"
        });
       
        return user.save();
    })
    .then(user=>{
        res.status(201).json({isSuccess: true , user:user._id});
    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });


};

exports.login = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    let loaded_user;

    User.findOne({email:email})
    .then((user)=>{
        
        userError.checkUser(user);
        
        loaded_user = user;
        return bcrpyt.compare(password,user.password);

    })
    .then((isEqual)=>{
        
        userError.checkPassword(isEqual);

        const token = jwt.sign({  email: loaded_user.email , id : loaded_user._id.toString() },'supersecretkey', { expiresIn:"1h" });

        res.setHeader('Authorization','Bearer '+ token);

        res.status(200).json({token:token , userId : loaded_user._id});


    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.checkEmail = (req,res,next)=>{
    const email = req.body.email;


    User.findOne({email:email})
    .then((userdoc)=>{
        if(userdoc)
        {
            const error = new Error('Email already exists!!');
            error.statusCode = 401;
            error.notAvailable = true;
            throw error;
        }
        res.status(200).json({available:true});
    }).
    catch(error =>{
        if(!error.statusCode)
        error.statusCode = 500;
        next(error);
    });

}

exports.signOut = (req,res,next)=>{
    req.userId = undefined;
    res.status(200).json({ loggedOutUser : true});
}

exports.checkAuth = (req,res,next)=>{
    const authHeaders = req.get('Authorization');

    if(!authHeaders)
    {
        res.status(200).json({ authenticated : false });
        return;
    }

    const token  = authHeaders.split(' ')[1];

    let decodedToken;

    try{
        decodedToken = jwt.verify(token,'supersecretkey');
    }
    catch(err){
        err.statusCode =500;
        throw err;
    }

    if(!decodedToken)
    {
        res.status(200).json({ authenticated : false });
        return;
    }

    res.status(200).json({ authenticated : true });
}

exports.checkUsername = (req,res,next)=>{

    const username = req.body.username;


    User.findOne({username:username})
    .then((userdoc)=>{
        if(userdoc)
        {
            const error = new Error('Username already exists!!');
            error.statusCode = 401;
            error.notAvailable = true;
            throw error;
        }
        res.status(200).json({available:true});
    }).
    catch(error =>{
        if(!error.statusCode)
        error.statusCode = 500;
        next(error);
    });


}

exports.getUserInfo = (req,res,next)=>{
    const userId = req.params.userId;

    User.findById(userId)
    .then((userdoc)=>{
        if(!userdoc)
        {
            const error = new Error('No user Present');
            error.statusCode = 401;
            error.notAvailable = true;
            throw error;
        }
        const { username, post , followers, following ,profileURL} = userdoc;
        res.status(200).json({userId:userId,
                              username : username,
                              profileURL:profileURL,
                              postsCount : post.length,
                              followers : followers.length,
                              following : following.length});
    }).
    catch(error =>{
        if(!error.statusCode)
        error.statusCode = 500;
        next(error);
    });

    
}

exports.addProfile = (req,res,next)=>{

    const userId = req.userId;

    userError.checkImage(req.file);

    const profileUrl = req.file.path;

    User.findById(userId)
    .then(user=>{

        if(user.profileURL)
        {
            fileHelper.deleteImage(user.profileURL);
        }
        user.profileURL = profileUrl;
        return user.save();

    })
    .then(result=>{

        res.status(200).json({
            message:"Added Profile Picture!",
            profileURL:profileUrl
        });

    })
    .catch(error =>{

        fileHelper.deleteImage(profileUrl);
        if(!error.statusCode)
        error.statusCode = 500;
        next(error);

    });
}

exports.follow = (req,res,next)=>{

    const userId = req.userId;
    const userIdFollowed = req.params.userId;

    userError.checkUserIdFollowed(userId,userIdFollowed);

    let user1;
    let username;

    User.findById(userId)    
    .then(user=>{
        username = user.username;
        user1 = user;

        return User.findById(userIdFollowed);
    })
    .then(followedUser=>{

        userError.checkUserId(followedUser);

        const followed = followedUser.following.find(o=> o.userId.toString() === userId)?true:false;


        const followers = {
            userId: mongoose.Types.ObjectId(userId),
            username:username,
            followed:followed
        }

        username = followedUser.username;

        followedUser.followers.push(followers);

        return followedUser.save();
    })
    .then(result=>{

        const followedObj = user1.followers.find(o=> o.userId.toString() === userIdFollowed);

        if(followedObj)
            followedObj.followed = true;

        const following = {
            userId: mongoose.Types.ObjectId(userIdFollowed),
            username:username
        }

        user1.following.push(following);

        return user1.save();
    })
    .then(result=>{
        res.status(200).json({message:"Followed the user",userIdFollowed:userIdFollowed});
    })
    .catch(error =>{

        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.unfollow = (req,res,next)=>{

    const userId = req.userId;
    const userIdUnfollowed = req.params.userId;

    userError.checkUserIdFollowed(userId,userIdUnfollowed);

    let user1;
    let username;

    User.findById(userId)    
    .then(user=>{
        username = user.username;
        user1 = user;

        return User.findById(userIdUnfollowed);
    })
    .then(unfollowedUser=>{

        userError.checkUserId(unfollowedUser);

        const userWhoUnfollowed = unfollowedUser.followers.find(o=> o.userId.toString() === userId);

        unfollowedUser.followers.pull(userWhoUnfollowed);

        return unfollowedUser.save();
    })
    .then(result=>{

        const followedObj = user1.followers.find(o=> o.userId.toString() === userIdUnfollowed);

        if(followedObj)
            followedObj.followed = false;

        const following_user = user1.following.find(o=> o.userId.toString() === userIdUnfollowed)._id;

        user1.following.pull(following_user);

        return user1.save();
    })
    .then(result=>{
        res.status(200).json({message:"UnFollowed the user",userIdUnFollowed:userIdUnfollowed});
    })
    .catch(error =>{

        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.getFollowers = (req,res,next)=>{

    const userId = req.params.userId;

    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8; 
    let totalitems;

    User.aggregate([
        {$match : {_id :mongoose.Types.ObjectId(userId) }},
        {$project:{NumberOfItemsInArray:{$size:"$followers"}}}
    ])
    .then(count=>{
        totalitems = count[0].NumberOfItemsInArray;

        return User.findById(userId,{_id:0,followers:1}).populate("followers.userId",{_id:1,profileURL:1});;
    })
    .then(user=>{
        userError.checkUserId(user);

        user.followers = user.followers.slice((currentPage - 1) * perPage, currentPage * perPage);



        res.status(200).json({fetched:true,result:user,totalitems:totalitems});

    })
    .catch(error =>{

        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });


}

exports.getFollowing = (req,res,next)=>{

    const userId = req.params.userId;

    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8; 
    let totalitems;

    User.aggregate([
        {$match : {_id :mongoose.Types.ObjectId(userId) }},
        {$project:{NumberOfItemsInArray:{$size:"$following"}}}
    ])
    .then(count=>{
        totalitems = count[0].NumberOfItemsInArray;

        return User.findById(userId,{_id:0,following:1}).populate("following.userId",{_id:1,profileURL:1});
    })
    .then(user=>{
        userError.checkUserId(user);

        user.following = user.following.slice((currentPage - 1) * perPage, currentPage * perPage);



        res.status(200).json({fetched:true,result:user,totalitems:totalitems});

    })
    .catch(error =>{

        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.searchUser = (req,res,next)=>{
    const search = req.params.search;
    const regexp = ".*" + search + ".*"; 
    User.find({username : {$regex: regexp , $options: 'i'}},{username:1,profileURL:1})
    .then(searchResult =>{
        res.status(200).json({fetched:true,result:searchResult});
    })
    .catch(error =>{

        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

exports.isFollowed = (req,res,next)=>{
    const userId = req.userId;
    const userToCheck = req.params.userId;

    User.find({$and  : [{"following.userId":mongoose.Types.ObjectId(userToCheck)} ,{_id :mongoose.Types.ObjectId(userId)}]},{following:1})
    .then(user=>{
        if(user.length !== 0)
            res.status(200).json({isFollowed:true});
        else 
            res.status(200).json({isFollowed:false});
    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}