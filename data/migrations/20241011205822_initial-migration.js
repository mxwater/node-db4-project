exports.up = async function(knex) {
    await knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id');
        table.string('recipe_name', 200).notNullable().unique();
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id');
        table.string('ingredient_name', 200).notNullable().unique();
        table.string('ingredient_unit', 50);
    })
    .createTable('steps', table => {
        table.increments('step_id');
        table.integer('step_number').notNullable();
        table.string('step_instructions', 500).notNullable(); // Matches your seed file
        table.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
    .createTable('step_ingredients', table => {
        table.increments('step_ingredient_id');
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.float('quantity').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
