
exports.seed = async function (knex) {
  //await knex.raw('TRUNCATE TABLE users_items CASCADE');

  //await knex('users_items').truncate()
  //await knex('items').truncate()
  //await knex('category').truncate()

  //await knex('users').truncate()
  //await knex('role').truncate()
  //await knex.raw('SET foreign_key_checks = 0');
  //await knex.raw('TRUNCATE TABLE role CASCADE');
  //await knex.raw('TRUNCATE TABLE category CASCADE');

  await knex('role').insert([
    { role_name: 'User' },
    { role_name: 'Owner' },
  ])
  await knex('category').insert([
    {
      category_name: 'Food'
    },
    {
      category_name: 'Clothing'
    },
    {
      category_name: 'Electronics'
    }
  ])
}
