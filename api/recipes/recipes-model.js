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
      's.step_instructions as step_text', 
      'i.ingredient_id',
      'i.ingredient_name',
      'si.quantity'
    )
    .orderBy('s.step_number')
    .where('r.recipe_id', recipe_id);

  const recipe = {
    recipe_id: recipeRows[0].recipe_id,
    recipe_name: recipeRows[0].recipe_name,
    steps: [],
  };

  recipe.steps = recipeRows.reduce((acc, row) => {
    let step = acc.find(s => s.step_id === row.step_id);

    if (!step) {
      step = {
        step_id: row.step_id,
        step_number: row.step_number,
        step_instructions: row.step_text,
        ingredients: [],
      };
      acc.push(step); 
    }

    if (row.ingredient_id) {
      step.ingredients.push({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient_name,
        quantity: row.quantity,
      });
    }

    return acc; 
  }, []);

  return recipe;
}

module.exports = {
  getRecipeById,
};
