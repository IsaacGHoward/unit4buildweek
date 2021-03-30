const JWT_SECRET = 'thisisthesecret';

const jwt = require("jsonwebtoken")

const db = require('../users/users-model');
const Roles = require('../roles/roles-model');

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

function checkUsernameValid(req,res,next) {
  if(!req.body.user_username)
    res.status(422).send({"message": "Missing Username Field"})
  else{
    db.findByName(req.body.user_username)
    .then(result => {
      if(!result)
        res.status(422).send({"message": "User does not exist"});
      else
        next();
    })
  }
}

function checkPasswordLength(req,res,next) {
  if(!req.body.user_password || req.body.user_password.length < 4)
    res.status(422).send({"message": "Password must be longer than 3 chars"})
  else
    next();
}

function checkValidRole(req,res,next){
  if(!req.body.role_id){
    Roles.findRoleByName('Owner')
    .then(role => {
      if(role){
        req.body.role_id = role.role_id;
        next();
      }
      else 
        res.status(422).send({"message" : "No Role Field, and the default Owner role does not exist"})
    })
  }
  else{
    Roles.findRoleById(req.body.role_id)
    .then(role => {
      if(role)
        next();
      else
        res.status(422).send({"message" : `No such role exists with ID of ${req.body.role_id}`});
    })
  }

}

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength,
  checkUsernameValid,
  checkValidRole
}
