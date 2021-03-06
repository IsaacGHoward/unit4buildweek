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

function checkValidItem(req,res,next){
  if(!req.body.item_name || !req.body.item_price || !req.body.item_location || !req.body.category_id)
    res.status(422).send({"message" : "Missing one or more required fields (check API docs)"})
  else 
    next()
}

function checkDuplicateItem(req,res,next){
  Items.findItemByName(req.body.item_name)
    .then(item => {
      if(item)
        res.status(422).send({"message" : "Item already exists with the given name"})
      else 
        next()
    })
}

function checkItemExists(req,res,next){
  Items.findItemById(req.params.item_id)
    .then(item => {
      if(item)
        next()
      else 
        res.status(422).send({"message" : "Item does not exist with the given ID"})
    })
}

function checkItemCategory(req,res,next){
  Categories.findCategoryById(req.body.category_id)
    .then(result => {
      if(!result)
        res.status(422).send({"message": "Category does not exist with the given ID"});
      else
        next()
    })
}

function checkOwners(req,res,next){
  Items.findOwnersByItemId(req.params.item_id)
    .then((owners) => {
      req.numOwners = owners.length;
      let owned = false;
      owners.forEach(owner => {
        if(req.token.subject === owner.user_id)
          owned = true;
      });
      if(owned)
        next();
      else 
        res.status(403).send({"message" : "You do not have permission to modify an item you do not own"})
    })
}

function checkDupeItemAdd(req,res,next){
  Items.findOwnersByItemId(req.params.item_id)
    .then((owners) => {
      let owned = false;
      owners.forEach(owner => {
        if(req.token.subject === owner.user_id)
          owned = true;
      });
      if(owned)
        res.status(403).send({"message" : "You already have this item in your inventory"})
      else
        next();
    })

}
//function checkItemExists
module.exports = {
  checkCategoryValid,
  checkOwnerValid,
  checkValidItem,
  checkDuplicateItem,
  checkItemExists,
  checkItemCategory,
  checkOwners,
  checkDupeItemAdd
}
