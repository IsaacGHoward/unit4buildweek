exports.up = async (knex) => {
  await knex.schema
    .createTable('role', (role) => {
      role.increments('role_id')
      role.string('role_name');
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      users.integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('role')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
      users.timestamps(false, true)
    })
    .createTable('category', (category) => {
      category.increments('category_id')
      category.string('category_name');
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
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })
    .createTable('users_items', (usr_itm) => {
      usr_itm.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
      usr_itm.integer('item_id')
        .unsigned()
        .notNullable()
        .references('item_id')
        .inTable('items')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT')
    })

}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('users_items')
    .dropTableIfExists('items')
    .dropTableIfExists('category')
    .dropTableIfExists('users')
    .dropTableIfExists('role')
}
