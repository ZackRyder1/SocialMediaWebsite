const { validationResult } = require('express-validator/check');

const feedError = require('../Error_handling/feed_error');

const userError = require('../Error_handling/user_error');

var mongoose = require('mongoose');

const fileHelper = require('../util/deleteImage');

const Post = require('../Models/post');

const User = require('../Models/user');
const { follow } = require('./userController');

exports.getPosts = (req,res,next) =>{

    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 3; 
    let totalitems;
    const userId = req.userId;

 

    

    Post.find({author:{ $nin: mongoose.Types.ObjectId(userId)} }).countDocuments()
    .then((count)=>{
        totalitems = count;

        return   Post.aggregate([
            {$match : { author :{ $nin: [mongoose.Types.ObjectId(userId)]} }},
            {$project:{_id:1,
                       Caption:1,
                       imageURL:1,
                       author:1,
                       likes:{$size:"$likes"},
                       comments:{$size:"$comments"}
                    }
            },
            {$skip : ((currentPage -  1) * perPage)},
            {$limit : perPage}
        ])
    })
    .then(posts=>{
        res.status(200).json({message: "Fetched Post succesfully!!",posts : posts , totalitems:totalitems});
    })
    .catch(error =>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
    
};

exports.getPost = (req,res,next)=>{
    const postId = req.params.postId;

    Post.findById(postId)
    .then(post=>{
        
        feedError.checkPost(post);

        res.status(200).json({
            message: "Post Fetched!!!",
            post : post
        });
    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
};

exports.createPost = (req,res,next)=>{
    const errors = validationResult(req);

    feedError.validation(errors);

    feedError.checkImage(req.file);

    const caption = req.body.caption;
    const imageUrl = req.file.path;
    let creator;

    const post = new Post({
        Caption:caption,
        imageURL:imageUrl,
        author: req.userId
    }); 

    post.save()
    .then((result)=>{

        return User.findById(req.userId);

    })
    .then((user)=>{

        user.post.push(post);
        creator = user;
        return user.save();

    })
    .then(result =>{

        res.status(200).json({
            message : "Post Created Successfully!!",
            post : result,
            user:{ userId: creator._id , username : creator.username }
        });

    })
    .catch((error)=>{
        fileHelper.deleteImage(imageUrl);
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
};


exports.updatePost = (req,res,next)=>{

    const postId = req.params.postId;
    const errors = validationResult(req);
    
    feedError.validation(errors);

    const caption = req.body.caption;
    // let imageURL = req.body.image;

    // if(req.file)
        // imageURL = req.file.path;

    // if(!imageURL)
    // {
    //     const error = new Error("No Image Provided!!!");
    //     error.statusCode = 422;
    //     throw error;
    // }

    Post.findById(postId)
    .then((post)=>{

        userError.checkAuth(req.userId,post.author.toString());

        feedError.checkPost(post);

        post.Caption = caption;

        return post.save();
    })
    .then((result)=>{
        res.status(200).json({message:"Post Updated Successfully!!",post:result });
    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
};

exports.deletePost = (req,res,next) =>{
    
    const postId = req.params.postId;

    Post.findById(postId)
    .then((post=>{

        feedError.checkPost(post);

        userError.checkAuth(req.userId,post.author.toString());

        fileHelper.deleteImage(post.imageURL);

        return Post.findByIdAndRemove(postId);

    }))
    .then(result=>{

        return User.findById(req.userId);

    })
    .then(user=>{

        user.post.pull(postId);
        return user.save();
        
    })
    .then(result=>{

        res.status(200).json({message:"Deleted the post!!"});

    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

};

exports.getUserPost = (req,res,next)=>{

    const userID = req.params.userId;

    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 8; 
    let totalitems;

    Post.find({author: userID}).countDocuments()
    .then(count=>{
        totalitems = count;

        return Post.find({author:userID})
        .skip(((currentPage -  1) * perPage))
        .limit(perPage);
    })
    .then((posts)=>{

        const MappedPosts = posts.map((post)=>{
            return { _id:post._id , Caption : post.Caption , imageURL : post.imageURL , author : post.author ,comments : post.comments.length , likes: post.likes.length}
        });

        return res.status(200).json({message:"Post of the user fetched!!", posts:MappedPosts , totalitems:totalitems });

    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

exports.like = (req,res,next)=>{
    const userId = req.userId;
    const postId = req.params.postId;
    let username;

    User.findById(userId)
    .then(user=>{
        if(!user)
        {
            const error = new Error("Cound not find the User with this Id");
            error.statusCode = 404;
            throw error;
        }

        username = user.username;
        return Post.findById(postId);
    })
    .then(post=>{

        feedError.checkPost(post);

        const like = {
            userId: mongoose.Types.ObjectId(userId),
            username:username
        }

        post.likes.push(like);

        return post.save();

    })
    .then(result=>{
        res.status(200).json({message : "Liked the post",userId:userId});
    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

exports.dislike = (req,res,next)=>{
    const userId = req.userId;
    const postId = req.params.postId;
    let username;

    Post.find({$and  : [{"likes.userId":mongoose.Types.ObjectId(userId)} ,{_id :mongoose.Types.ObjectId(postId)}]},{likes:1})
    .then(post=>{

        feedError.checkPost(post);


        const dislike_user = post[0].likes.find(o=> o.userId.toString() === userId)._id;


        post[0].likes.pull(dislike_user);

        return post[0].save();

    })
    .then(result=>{
        res.status(200).json({message : "DisLiked the post",userId:userId});

    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}


exports.comment = (req,res,next)=>{
    const userId = req.userId;
    const postId = req.params.postId;
    const comment_body = req.body.comment;
    let username;

    User.findById(userId)
    .then(user=>{
        if(!user)
        {
            const error = new Error("Cound not find the User with this Id");
            error.statusCode = 404;
            throw error;
        }

        username = user.username;
        return Post.findById(postId);
    })
    .then(post=>{

        feedError.checkPost(post);

        const comment = { 
            userId: mongoose.Types.ObjectId(userId),
            username:username,
            comment:comment_body
        }

        post.comments.push(comment);

        return post.save();

    })
    .then(result=>{
        res.status(200).json({message : "Commented on the post",userId:userId});
    })
    .catch(error=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

exports.getComments = (req,res,next)=>{

    const postId = req.params.postId;
    
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 2; 

    // Post.aggregate([
    //     {$match : {_id :mongoose.Types.ObjectId(postId) }},
    //     {$project:{_id:0,comments:1}},
    //     {$slice: ["$comments",-2]}
    // ])
    // .then(res=>{
    //     console.log("chu");
    //     console.log(res);
    // })
    //Not supported by the free version

    let totalitems;

    Post.aggregate([
        {$match : {_id :mongoose.Types.ObjectId(postId) }},
        {$project:{NumberOfItemsInArray:{$size:"$comments"}}}
    ])
    .then(count=>{
        totalitems = count[0].NumberOfItemsInArray;

        return Post.findById(postId,{comments:1,_id:0}).populate("comments.userId",{_id:1,profileURL:1});
    })
    .then((comments)=>{

        comments.comments = comments.comments.slice((currentPage - 1) * perPage, currentPage * perPage);



        return res.status(200).json({message:"Comments of the post fetched!!", comments:comments , totalitems:totalitems });

    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.getLikes = (req,res,next)=>{

    const postId = req.params.postId;
    
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 2; 

    let totalitems;

    Post.aggregate([
        {$match : {_id :mongoose.Types.ObjectId(postId) }},
        {$project:{NumberOfItemsInArray:{$size:"$likes"}}}
    ])
    .then(count=>{
        totalitems = count[0].NumberOfItemsInArray;

        return Post.findById(postId,{likes:1,_id:0}).populate("likes.userId",{_id:1,profileURL:1});
    })
    .then((likes)=>{

        likes.likes = likes.likes.slice((currentPage - 1) * perPage, currentPage * perPage);

        return res.status(200).json({fetched:true, result:likes , totalitems:totalitems });

    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });

}

exports.isLiked = (req,res,next)=>{
    const userId = req.userId;
    const postId = req.params.postId;


    Post.find({$and  : [{"likes.userId":mongoose.Types.ObjectId(userId)} ,{_id :mongoose.Types.ObjectId(postId)}]},{likes:1})
    .then(post=>{
        if(post.length !== 0)
            res.status(200).json({isLiked:true});
        else 
            res.status(200).json({isLiked:false});
    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

exports.getFeedPost = (req,res,next)=>{
    
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 2; 
    let totalitems;
    const userId = req.userId;

    User.aggregate([
        {$match : { _id :mongoose.Types.ObjectId(userId) }},
        {$project:{ _id:0,
                    'following':{
                        $map:{
                            'input' : '$following',
                            'as' : 'following',
                            'in' : {
                                'userId' : '$$following.userId'
                            }
                        }
                    }
                  }
        }
    ]).then(user=>{
        const following  = user[0].following;

        const Mappedfollowing = [];


        for(let i=0;i<following.length;i++)
        {
            Mappedfollowing[i] =  mongoose.Types.ObjectId(following[i].userId);
        }



        return   Post.aggregate([
            {$match : { author :{ $in: Mappedfollowing }}},
            {$project:{_id:1,
                       Caption:1,
                       imageURL:1,
                       author:1,
                       likes:{$size:"$likes"},
                       comments:{$size:"$comments"}
                    }
            },
            {
            $facet: {
                paginatedResults: [{ $skip: ((currentPage -  1) * perPage) }, { $limit: perPage }],
                totalCount: [
                  {
                    $count: 'count'
                  }
                ]}
            }
        ]);
    })
    .then(posts=>{

        const result = posts[0].paginatedResults;
        totalitems = posts[0].totalCount[0].count;
        res.status(200).json({message:"Feed Post of the user fetched!!", posts:result, totalitems:totalitems});
    })
    .catch((error)=>{
        if(!error.statusCode)
            error.statusCode = 500;
        next(error);
    });
}

