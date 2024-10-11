const db = require('../../data/db-config');

function getRecipeById(recipe_id) {

  return db('recipes as r')
    .leftJoin('steps as s', 'r.recipe_id', 's.recipe_id')
    .leftJoin('step_ingredients as si', 's.step_id', 'si.step_id')
    .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
    .select(
      'r.recipe_id',
      'r.recipe_name',
      'r.created_at',
      's.step_id',
      's.step_number',
      's.step_instructions',
      'i.ingredient_id',
      'i.ingredient_name',
      'si.quantity'
    )
    .where('r.recipe_id', recipe_id)
    .orderBy('s.step_number')
    .then((rows) => {
      
      if (rows.length === 0) return null;

     
      const recipe = {
        recipe_id: rows[0].recipe_id,
        recipe_name: rows[0].recipe_name,
        created_at: rows[0].created_at,
        steps: rows.reduce((acc, row) => {
       
          let step = acc.find((s) => s.step_id === row.step_id);
          if (!step) {
            step = {
              step_id: row.step_id,
              step_number: row.step_number,
              step_instructions: row.step_instructions,
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
        }, []),
      };

      return recipe;
    });
}

module.exports = {
  getRecipeById,
};
