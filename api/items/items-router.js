const router = require("express").Router();

const Users = require("../users/users-model");
const Items = require('./items-model');

const middleware = require('./items-middleware');
const { restricted } = require('../auth/auth-middleware');

router.get('/', restricted, (req, res) => {
  Items.find()
    .then(response => {
      if(response.length > 0)
        res.send(response)
      else
        res.send({'message':'no items'})
    })
});




module.exports = router;