
exports.checkPost =(post)=>{ 
    if(!post)
            {
                const error = new Error("Cound not find the post!!!");
                error.statusCode = 404;
                throw error;
            }
}

exports.validation = (errors)=>{
    if(!errors.isEmpty())
        {
            const error = new Error("Validation failed, entered data is incorrect!!");
            error.statusCode = 422;
            error.log = errors.array();
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