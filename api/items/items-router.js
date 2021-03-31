const router = require("express").Router();

const Users = require("../users/users-model");
const Items = require('./items-model.js');
const Categories = require('../categories/categories-model');

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

router.get('/categories', restricted, (req,res) => {
  Categories.find()
    .then(response => {
      if(response.length > 0)
        res.send(response)
      else
        res.send({'message' : 'no categories'})
    })
})

router.get('/categories/:category_id', restricted, middleware.checkCategoryValid, (req,res) => {
  Items.findItemsByCategoryId(req.params.category_id)
    .then(items => {
      if(items.length > 0)
        res.send(items)
      else
        res.send({'message':'no items in category'})
    })
})

router.get('/owner/:user_id', restricted, middleware.checkOwnerValid, (req,res) => {
  Items.findItemsByOwnerId(req.params.user_id)
    .then(items => {
      if(items.length > 0)
        res.send(items)
      else
        res.send({'message' : 'owner has no items'})
    })
})

router.post('/', restricted, middleware.checkValidItem, middleware.checkDuplicateItem, middleware.checkItemCategory, (req,res) => {
  Items.add(req.token.subject, req.body)
    .then(saved => {
      if(saved)
        res.send(saved);
      else
        res.status(500).json({'message': 'Could not add item'});
    })
})

//router.put('/:item_id', restricted, )

module.exports = router;