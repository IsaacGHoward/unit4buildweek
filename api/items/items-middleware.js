const Items = require('./items-model');
const Categories = require('../categories/categories-model');
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

module.exports = {
  checkCategoryValid,
}
