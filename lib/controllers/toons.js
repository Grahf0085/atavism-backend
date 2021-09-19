import { Router } from 'express';
import { Toon } from '../models/Toon.js';

export default Router()

  .get('/api/toons', async (req, res, next) => {
    Toon.findAll()
      .then(toons => res.send(toons))
      .catch(next);
  })

  .get('/api/toon/:name', async (req, res, next) => {
    Toon.findByName(req.params.name)
      .then(toon => res.send(toon))
      .catch(next);
  })

  .get('/api/toonlist/:namesearch', async (req, res, next) => {
    Toon.findAllNames(req.params.namesearch)
      .then(toon => res.send(toon))
      .catch(next);
  });
