exports.up = function(knex) {
    return knex.schema.createTable('ingredients', (table) => {
      table.increments('ingredient_id');
      table.string('ingredient_name').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('ingredients');
  };
  