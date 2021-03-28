const router = require("express").Router();
const Users = require('./users-model')

router.get('/', (req, res) => {
  Users.find()
    .then(response => {
      if(response.length > 0)
        res.send(response)
      else
        res.send({'message':'no users'})
    })
});

module.exports = router;