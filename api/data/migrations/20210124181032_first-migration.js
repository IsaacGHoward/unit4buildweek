exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      users.string('user_email', 320).notNullable()
      users.timestamps(false, true)
    })
    .createTable('category', (category) => {
      category.increments('category_id')
      category.string('name');
    })
    .createTable('role', (role) => {
      role.increments('role_id')
      role.string('name');
    })
    .createTable('items', (items) => {
      items.increments('item_id')
      items.string('item_name')
        .notNullable()
        .unique()
      items.string('item_description')
      items.string('item_price')
        .notNullable()
      items.string('item_location')
        .notNullable()
      items.integer('category_id')
        .unsigned()
        .notNullable()
        .references('category_id')
        .inTable('category')
    })
    .createTable('users_items', (usr_itm) => {
      usr_itm.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
      usr_itm.integer('item_id')
        .unsigned()
        .notNullable()
        .references('item_id')
        .inTable('items')
    })

}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('category')
    .dropTableIfExists('role')
    .dropTableIfExists('items')
    .dropTableIfExists('users_items')

}
