import pool from '../utils/pool.js';

export class Recipe {

  id;
  keyitem;
  wood;
  smith;
  gold;
  cloth;
  leather;
  bone;
  alchemy;
  cook;
  crystal;
  ingredient1;
  ingredient2;
  ingredient3;
  ingredient4;
  ingredient5;
  ingredient6;
  ingredient7;
  ingredient8;
  result;
  resultHQ1;
  resultHQ2;
  resultHQ3;
  resultQty;
  resultHQ1Qty;
  resultHQ2Qty;
  resultHQ3Qty;

  constructor(row) {

    this.id = row.id;
    this.keyitem = row.KeyItem;
    this.wood = row.Wood;
    this.smith = row.Smith;
    this.gold = row.Gold;
    this.cloth = row.Cloth;
    this.leather = row.Leather;
    this.bone = row.Bone;
    this.alchemy = row.Alchemy;
    this.cook = row.Cook;
    this.crystal = row.Crystal;
    this.ingredient1 = row.Ingredient1;
    this.ingredient2 = row.Ingredient2;
    this.ingredient3 = row.Ingredient3;
    this.ingredient4 = row.Ingredient4;
    this.ingredient5 = row.Ingredient5;
    this.ingredient6 = row.Ingredient6;
    this.ingredient7 = row.Ingredient7;
    this.ingredient8 = row.Ingredient8;
    this.result = row.Result;
    this.resultHQ1 = row.ResultHQ1;
    this.resultHQ2 = row.ResultHQ2;
    this.resultHQ3 = row.ResultHQ3;
    this.resultQty = row.ResultQty;
    this.resultHQ1Qty = row.ResultHQ1Qty;
    this.resultHQ2Qty = row.ResultHQ2Qty;
    this.resultHQ3Qty = row.ResultHQ3Qty;

  }

  static async byCraft(skill) {

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT id, Wood, Smith, Gold, Cloth, Leather, Bone, Alchemy, Cook, 
    (SELECT name from item_basic WHERE item_basic.itemid = synth_recipes.crystal) AS Crystal,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient1) AS Ingredient1,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient2) AS Ingredient2,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient3) AS Ingredient3,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient4) AS Ingredient4,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient5) AS Ingredient5,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient6) AS Ingredient6,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient7) AS Ingredient7,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient8) AS Ingredient8,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Result) AS Result,
      ResultQty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ1) AS ResultHQ1,
      ResultHQ1Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ2) AS ResultHQ2,
      ResultHQ2Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ3) AS ResultHQ3,
      ResultHQ3Qty
  FROM synth_recipes
  WHERE (
    CASE (?)
      WHEN 'wood'
        THEN synth_recipes.wood > 0
      WHEN 'smith'
        THEN synth_recipes.smith > 0
      WHEN 'gold'
        THEN synth_recipes.gold > 0
      WHEN 'cloth'
        THEN synth_recipes.cloth > 0
      WHEN 'leather'
        THEN synth_recipes.leather > 0
      WHEN 'bone'
        THEN synth_recipes.bone > 0
      WHEN 'alchemy'
        THEN synth_recipes.alchemy > 0
      WHEN 'cook'
        THEN synth_recipes.cook > 0
    END
  )
  ORDER BY (
    CASE (?)
      WHEN 'wood'
        THEN synth_recipes.wood
      WHEN 'smith'
        THEN synth_recipes.smith
      WHEN 'gold'
        THEN synth_recipes.gold
      WHEN 'cloth'
        THEN synth_recipes.cloth
      WHEN 'leather'
        THEN synth_recipes.leather
      WHEN 'bone'
        THEN synth_recipes.bone
      WHEN 'alchemy'
        THEN synth_recipes.alchemy
      WHEN 'cook'
        THEN synth_recipes.cook
  END
  )
  `, [skill, skill]);

    conn.release();

    return rows.map(row => new Recipe(row));
  }

  static async findResult(name) {

    const nameSplit = (name.split(" "));

    const firstWord = nameSplit[0] || name;
    const secondWord = nameSplit[1] || '';

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT id, Wood, Smith, Gold, Cloth, Leather, Bone, Alchemy, Cook, 
    (SELECT name from item_basic WHERE item_basic.itemid = synth_recipes.crystal) AS Crystal,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient1) AS Ingredient1,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient2) AS Ingredient2,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient3) AS Ingredient3,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient4) AS Ingredient4,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient5) AS Ingredient5,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient6) AS Ingredient6,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient7) AS Ingredient7,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient8) AS Ingredient8,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Result) AS Result,
      ResultQty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ1) AS ResultHQ1,
      ResultHQ1Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ2) AS ResultHQ2,
      ResultHQ2Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ3) AS ResultHQ3,
      ResultHQ3Qty
  FROM synth_recipes
  WHERE (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Result) LIKE (?)
    `, [`%${firstWord}%${secondWord}%`]);

    conn.release();

    return rows.map(row => new Recipe(row));
  }

  static async findIngredient(name) {

    const nameSplit = (name.split(" "));

    const firstWord = nameSplit[0] || name;
    const secondWord = nameSplit[1] || '';

    const conn = await pool.getConnection();

    const rows = await conn.query(`
    SELECT id, Wood, Smith, Gold, Cloth, Leather, Bone, Alchemy, Cook, 
    (SELECT name from item_basic WHERE item_basic.itemid = synth_recipes.crystal) AS Crystal,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient1) AS Ingredient1,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient2) AS Ingredient2,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient3) AS Ingredient3,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient4) AS Ingredient4,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient5) AS Ingredient5,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient6) AS Ingredient6,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient7) AS Ingredient7,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient8) AS Ingredient8,
    (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Result) AS Result,
      ResultQty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ1) AS ResultHQ1,
      ResultHQ1Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ2) AS ResultHQ2,
      ResultHQ2Qty,
      (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.ResultHQ3) AS ResultHQ3,
      ResultHQ3Qty
  FROM synth_recipes
  WHERE (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient1) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient2) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient3) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient4) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient5) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient6) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient7) LIKE (?) OR
  (SELECT name FROM item_basic WHERE item_basic.itemid = synth_recipes.Ingredient8) LIKE (?)

    `, [`%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`, `%${firstWord}%${secondWord}%`]);

    conn.release();

    return rows.map(row => new Recipe(row));
  }

}