const express = require("express");

const multer = require('multer');

const path = require('path');

const feedRoutes = require('./Routes/feed');

const Image = require('./util/deleteImage');

const userRoutes = require('./Routes/user');

const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'images');
    },
    filename: (req,file,cb)=>{
        cb(null,new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter =(req,file,cb)=>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    )
        cb(null,true);
    else
        cb(null,false);
};

app.use(bodyparser.json());

app.use(multer({storage: fileStorage, fileFilter : fileFilter}).single('image')); //Remember for Angular

app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    
    next();
});

app.use('/user',userRoutes);



app.use('/feed',feedRoutes);

app.use((error,req,res,next)=>{
    // console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    if(req.file)
    {
        Image.deleteImage(req.file.path);
    }
    
    res.status(status).json({
        message: message,
        errors: error.log
    });
});


mongoose
.connect("mongodb+srv://zack_ryder:zaki7038@cluster0.fpflc.mongodb.net/socialMedia?retryWrites=true&w=majority")
.then((result)=>{
    app.listen(8080);
})
.catch((err)=>{
    console.log(err);  
});

