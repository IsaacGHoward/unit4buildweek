const JWT_SECRET = 'thisisthesecret';

const jwt = require("jsonwebtoken")

const db = require('../users/users-model');

const restricted = (req, res, next) => {
 //const token = req.cookies.token; 
 const token = req.headers.authorization; 
 if(!token)
    return res.status(401).json({"message": "Token required"})
 else{
   jwt.verify(token, JWT_SECRET, (err, decoded) => {
     if(err)
      return res.status(401).json({"message": "Token invalid"})
     else{
      req.token = decoded;
      next();
     }
   })
 }
}

module.exports = {
  restricted,
}
