const {sign, verify} = require("jsonwebtoken") ;

const secret = "gbdjsyhgbvhysgfviy" ;

const createToken = (user) => {
    const accessToken = sign({
         username: user.username,id: user.id},
        secret, );

    return accessToken ;
};



const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if(!accessToken){
        return res.status(400).json({error: "User not Authenticated!"}) ;
    }
    else{
        JsonWebTokenError.verify(accessToken,secret,(err,decoded)=>{
            if(err){
                return res.json({auth: false, message: "YOu failed to authenticate"})
            }
            else{
                req.userId = decoded.id ;
                return next() ;
            }
        })
    }
};



module.exports = {createToken, validateToken}