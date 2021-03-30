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

function checkUsernameFree(req,res,next) {
  if(!req.body.user_username)
    res.status(422).send({"message": "Missing Username Field"})
  else{
    db.findByName(req.body.user_username)
    .then(result => {
      if(!result)
        next()
      else
        res.status(422).send({"message": "Username taken"});
    })
  }
}

function checkPasswordLength(req,res,next) {
  if(!req.body.user_password || req.body.user_password.length < 4)
    res.status(422).send({"message": "Password must be longer than 3 chars"})
  else
    next();
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength
}
