const router = require("express").Router();
const Users = require('./users-model');

const middleware = require('../auth/auth-middleware');

router.get('/', middleware.restricted, (req, res) => {
  Users.find()
    .then(response => {
      if(response.length > 0)
        res.send(response)
      else
        res.send({'message':'no users'})
    })
});

module.exports = router;