import { Router } from 'express';
import { Recipe } from '../models/Recipe.js';

export default Router()

  .get('/api/recipes/:craft', async (req, res, next) => {
    Recipe.byCraft(req.params.craft)
      .then(craftItem => res.send(craftItem))
      .catch(next);
  })

  .get('/api/recipes/result/:recipesearch', async (req, res, next) => {
    Recipe.findResult(req.params.recipesearch)
      .then(recipeList => res.send(recipeList))
      .catch(next);
  })
  .get('/api/recipes/ingredient/:recipesearch', async (req, res, next) => {
    Recipe.findIngredient(req.params.recipesearch)
      .then(recipeList => res.send(recipeList))
      .catch(next);
  });