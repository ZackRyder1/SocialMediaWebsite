const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const authHeaders = req.get('Authorization');

    if(!authHeaders)
    {
        const error = new Error("not Authenticated");
        error.statusCode = 401;
        throw error;
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
        const error = new Error("not Authenticated");
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.id;
    next();
    
}