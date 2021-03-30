const db = require('../data/db-config.js');

function find(){
  return db('role as r')
    .select('r.role_id', 'r.role_name')
}

function findRoleById(role_id){
  return db('role as r')
    .where('r.role_id', role_id)
    .first('r.role_id', 'r.role_name')
}

function findRoleByName(role_name){
  return db('role as r')
    .where('r.role_name', role_name)
    .first('r.role_id', 'r.role_name')
}

module.exports = {
  find,
  findRoleById,
  findRoleByName,
};