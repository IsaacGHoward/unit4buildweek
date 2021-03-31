const db = require('../data/db-config.js');

function find(){
  return db('items as i')
    .select('*')
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
}

function findItemsByOwnerId(user_id){
  return db('users_items as ui')
    .innerJoin('items as i', 'i.item_id', 'ui.item_id')
    .where('user_id', user_id)
    .select('*')
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



module.exports = {
  find,
  findItemById,
  findItemByName,
  findItemsByCategoryId,
  findItemsByOwnerId,
  add,
};