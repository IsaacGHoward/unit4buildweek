const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'thisisthesecret';

const Users = require("../users/users-model");

const middleware = require('./auth-middleware');

router.post('/register', middleware.checkUsernameFree, middleware.checkPasswordLength, middleware.checkValidRole, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.user_password, 12);
  user.user_password = hash;
  Users.add(user)
    .then(saved => {
      if(saved){
        Users.find()
          .then((response) => {
            Users.findById(response.length)
            .then(theuser => {
              res.status(201).json(theuser)
            })
          })
        
      }
      else
        res.status(500).json({'message': 'Could not add user'});
    })
});

router.post('/login', middleware.checkUsernameValid, middleware.checkPasswordLength, (req, res) => {
  const { user_username, user_password } = req.body;
  Users.findByName(user_username)
    .then(user => {
      const validPass = bcrypt.compareSync(user_password, user.user_password);
      if(!validPass)
        return res.status(401).json({message: "invalid credentials"})
      else{
        const token = generateToken(user);
        //res.cookie('token', token);
        res.json({'message': `Welcome ${user.user_username}`, 'token': token})
      }
    })
});




function generateToken(user){
  const payload = {
    subject: user.user_id,
    username: user.user_username,
    role: user.role_id
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload,JWT_SECRET, options)
}

module.exports = router;