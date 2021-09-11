import { Router } from 'express';
import { Recipe } from '../models/Recipe.js';

export default Router()

  .get('/api/recipes/wood', async (req, res, next) => {
    Recipe.wood()
      .then(woodItem => res.send(woodItem))
      .catch(next);
  })
  .get('/api/recipes/smith', async (req, res, next) => {
    Recipe.smith()
      .then(smithItem => res.send(smithItem))
      .catch(next);
  })
  .get('/api/recipes/gold', async (req, res, next) => {
    Recipe.gold()
      .then(goldItem => res.send(goldItem))
      .catch(next);
  })
  .get('/api/recipes/cloth', async (req, res, next) => {
    Recipe.cloth()
      .then(clothItem => res.send(clothItem))
      .catch(next);
  })
  .get('/api/recipes/leather', async (req, res, next) => {
    Recipe.leather()
      .then(leatherItem => res.send(leatherItem))
      .catch(next);
  })
  .get('/api/recipes/bone', async (req, res, next) => {
    Recipe.bone()
      .then(boneItem => res.send(boneItem))
      .catch(next);
  })
  .get('/api/recipes/alchemy', async (req, res, next) => {
    Recipe.alchemy()
      .then(alchemyItem => res.send(alchemyItem))
      .catch(next);
  })
  .get('/api/recipes/cook', async (req, res, next) => {
    Recipe.cook()
      .then(cookItem => res.send(cookItem))
      .catch(next);
  });