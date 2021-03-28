const db = require('../data/db-config.js');

function find(){
  return db('users as u')
    .innerJoin('role as r', 'r.role_id', 'u.role_id')
    .select('u.user_id', 'u.user_username', 'u.user_password', 'r.role_name')
}

function findById(user_id){
  return db('users as u')
    .innerJoin('role as r', 'r.role_id', 'u.role_id')
    .where('u.user_id', user_id)
    .first('u.user_id', 'u.user_username', 'r.role_name')
}

function findByName(user_username){
  return db('users as u')
    .innerJoin('role as r', 'r.role_id', 'u.role_id')
    .where('u.user_username', user_username)
    .first('u.user_id', 'u.user_username','u.user_password','r.role_name')
}

function add(user){
  return db('users')
    .insert(user)
}

/*
const add = async user => {
  //let created_user_id;
  await db('users')
     .insert(user)
     .then(ids => {
       return('success');
        //console.log(ids[0]);
        //created_user_id = ids[0];
     });

  //return findById(created_user_id);
 }
*/
 module.exports = {
  find,
  findById,
  findByName,
  add
};