const jwt = require("jsonwebtoken");
const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            const userid = decoded.userID
            req.body.userID = userid
            next()
        }else{
            res.send({"mssg":"Please login first"});
        }
    }else{
        res.send({"mssg":"Please login first"})
    }
}
module.exports = {authenticate}