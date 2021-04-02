const db = require('../data/db-config.js');

function find(){
  return db('category as c')
    .select('*')
    .sortBy('c.category_id', 'asc')
}

function findCategoryById(category_id){
  return db('category as c')
    .where('c.category_id', category_id)
    .first('c.category_name')
}

module.exports = {
  find,
  findCategoryById
};