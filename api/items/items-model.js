const db = require('../data/db-config.js');

function find(){
  return db('items as i')
    .select('*')
    .orderBy('i.item_id', 'asc')
}

function findItemById(item_id){
  return db('items as i')
    .where('i.item_id', item_id)
    .first('*')
}

function findItemByName(item_name){
  return db('items as i')
    .where('i.item_name', item_name)
    .first('*')
}

function findItemsByCategoryId(category_id){
  return db('items as i')
    .where('i.category_id', category_id)
    .select('*')
    .orderBy('i.item_id', 'asc')
}

function findItemsByOwnerId(user_id){
  return db('users_items as ui')
    .innerJoin('items as i', 'i.item_id', 'ui.item_id')
    .where('user_id', user_id)
    .select('*')
    .orderBy('i.item_id', 'asc')
}

function findOwnersByItemId(item_id){
  return db('users_items as ui')
    .innerJoin('users as u', 'u.user_id', 'ui.user_id')
    .where('item_id', item_id)
    .select('u.user_id')
}

function add(user_id, item){
    return db('items')
      .insert(item, 'item_id')
      .then(saved => {
        return db('users_items')
          .insert({'user_id' : user_id, 'item_id' : saved[0]})
          .then(() => {
            return findItemById(saved[0])
          })
      })
}

function updateItem(item_id, item){
  return db('items')
    .where('item_id', item_id)
    .update(item)
    .then(() => {
      return findItemById(item_id);
    })
}

function addToOwner(user_id, item_id){
  return db('users_items')
    .insert({'user_id' : user_id, 'item_id' : item_id})
    .then(() => {
      return findItemsByOwnerId(user_id);
    })
}

function removeFromOwner(user_id, item_id){
  return db('users_items')
    .where({'user_id' : user_id, 'item_id' : item_id})
    .del()
}



module.exports = {
  find,
  findItemById,
  findItemByName,
  findItemsByCategoryId,
  findItemsByOwnerId,
  findOwnersByItemId,
  add,
  updateItem,
  addToOwner,
  removeFromOwner
};