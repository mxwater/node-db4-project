const express = require('express');
const router = express.Router();
const Recipes = require('./recipes-model');



router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipes.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
