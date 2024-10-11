const express = require('express');
const router = express.Router();
const Recipes = require('./recipes-model');


router.use('*', (req, res, next) => {
  res.json({api: 'up'})
})

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: 'something went wrong inside the recipes router',
    message: err.message,
    stack: err.stack,
  })
})

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
