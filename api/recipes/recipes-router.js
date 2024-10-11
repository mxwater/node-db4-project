const express = require('express');
const router = express.Router();
const Recipe = require('./recipes-model');


router.get('/:recipe_id', (req, res, next) => {
  Recipe.getRecipeById(req.params.recipe_id)
    .then(recipe => { 
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: 'Recipe not found' });
      }
    })
    .catch(next);
});



router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: 'Something went wrong inside the recipes router',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
