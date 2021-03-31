const Items = require('./items-model');
const Categories = require('../categories/categories-model');
const Users = require('../users/users-model');
//const Roles = require('../roles/roles-model');

function checkCategoryValid(req,res,next) {
  if(!req.params.category_id)
    res.status(422).send({"message": "Missing Category ID"})
  else{
    Categories.findCategoryById(req.params.category_id)
    .then(result => {
      if(!result)
        res.status(422).send({"message": "Category does not exist"});
      else
        next()
    })
  }
}

function checkOwnerValid(req,res,next) {
  if(!req.params.user_id)
    res.status(422).send({"message" : "Missing User ID"})
  else{
    Users.findById(req.params.user_id)
    .then(user => {
      if(!user)
        return res.status(404).send({"message" : `User does not exist at ID ${req.params.user_id}`})
      else if(user.role_name !== "Owner")
        return res.status(422).send({"message" : "User requested is not an Owner"})
      else
        next()
    })
  }
}

module.exports = {
  checkCategoryValid,
  checkOwnerValid
}
