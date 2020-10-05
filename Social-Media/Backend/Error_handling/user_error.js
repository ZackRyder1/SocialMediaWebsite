exports.validation = (errors)=>{
    if(!errors.isEmpty())
        {
            const error = new Error("Validation failed, entered data is incorrect!!");
            error.statusCode = 422;
            error.log = errors.array();
            throw error;
        }
};

exports.checkUser =(user)=>{ 
    if(!user)
            {
                const error = new Error("Cound not find the User with this email!!!");
                error.statusCode = 404;
                throw error;
            }
}

exports.checkUserId =(user)=>{ 
    if(!user)
            {
                const error = new Error("Cound not find the User");
                error.statusCode = 404;
                throw error;
            }
}

exports.checkPassword = (isEqual)=>{
    if(!isEqual)
    {
        const error = new Error("Passwords did not match");
        error.statusCode = 401;
        throw error;
    }
}

exports.checkAuth = (firstid , secondid)=>{
    if(firstid !== secondid)
    {
        const error = new Error("Not Authorized!!");
        error.statusCode = 401;
        throw error;
    }
};

exports.checkImage = (file)=>{
    if(!file)
    {
        const error = new Error("No Image Provided!!!");
        error.statusCode = 422;
        throw error;
    }
};


exports.checkUserIdFollowed = (firstid , secondid)=>{
    if(firstid === secondid)
    {
        const error = new Error("Same User , follow request not authorized!!!");
        error.statusCode = 401;
        throw error;
    }
};
