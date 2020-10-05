const mongoose = require('mongoose');

const schema = mongoose.Schema;

const postSchema = new schema({
    Caption:{
        type: String,
        required : true
    },
    imageURL:{
        type:String,
        required:true
    },
    author: {
        type : schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    likes:[{
        userId:
        {
            type : schema.Types.ObjectId,
            ref: 'User'
        },
        username:String
    }],
    comments:[{
        userId:
        {
            type : schema.Types.ObjectId,
            ref: 'User'
        },
        username:String,
        comment:String
    }]
},{timestamps:true});

module.exports = mongoose.model('Post',postSchema);