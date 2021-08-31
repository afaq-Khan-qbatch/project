const jwt = require('jsonwebtoken');

module.exports = async (req , res , next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).json({
            error: [
                {
                    msg: "Token is invalid "
                }
            ]
        })
    }
    try{
        const user = await jwt.verify(token , "hjgkgjhlklkj;ljghdhg");
        next();
    }catch(e){
        return res.status(400).json({
            error: [
                {
                    msg: "Token is invalid "
                }
            ]
        })
    }
}