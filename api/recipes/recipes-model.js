const db = require('../../data/db-config');

async function getRecipeById(recipe_id) {
  const recipeRows = await db('recipes as r')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('step_ingredients as si', 's.step_id', 'si.step_id')
    .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
    .select(
      'r.recipe_id',
      'r.recipe_name',
      's.step_id',
      's.step_number',
      's.step_instructions as step_text', // Updated to match your migration file
      'i.ingredient_id',
      'i.ingredient_name',
      'si.quantity'
    )
    .orderBy('s.step_number')
    .where('r.recipe_id', recipe_id);

  return recipeRows;
}

module.exports = {
  getRecipeById
};
