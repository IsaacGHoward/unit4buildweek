const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = 'thisisthesecret';

const Users = require("../users/users-model");

router.post('/register', (req, res) => {
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