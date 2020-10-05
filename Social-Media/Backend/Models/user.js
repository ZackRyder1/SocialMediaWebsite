const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema  = new Schema({
        username:{
            type:String ,
            required : true
        },
        email:{
            type : String,
            required : true
        },
        password:{
            type : String,
            required: true
        },
        profileURL:{
            type:String
        },
        post:[
            {
                type : Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        followers:[{
            userId:
            {
                type : Schema.Types.ObjectId,
                ref: 'User'
            },
            username:String,
            followed:Boolean
        }],
        following:[{
            userId:
            {
                type : Schema.Types.ObjectId,
                ref: 'User'
            },
            username:String
        }]
});

module.exports = mongoose.model('User',userSchema);