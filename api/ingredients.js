const express = require('express');
const router = express.Router();
const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../db/queries/ingredients');

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const ingredient = await getIngredientById(req.params.id);
    if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
    res.json(ingredient);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, recipe_id } = req.body;
    if (!name || !recipe_id) {
      return res.status(400).json({ error: 'Name and recipe_id are required' });
    }
    const newIngredient = await createIngredient({ name, recipe_id });
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedIngredient = await updateIngredient(req.params.id, req.body);
    res.json(updatedIngredient);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteIngredient(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
