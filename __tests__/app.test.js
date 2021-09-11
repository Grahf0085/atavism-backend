import request from 'supertest';
import app from '../lib/app.js';

// describe('toon routes', () => {

//   it('finds all toons via GET', async () => {

//     const expected = [{ 'id': 20, 'mainJob': 7, 'mainLevel': 30, 'name': 'Cow', 'subJob': 0, 'subLevel': 0 }];

//     const res = await request(app)
//       .get('/api/toons');

//     expect(res.body).toEqual(expect.arrayContaining(expected));

//   });

//   it('gets a specific toon via GET', async () => {

//     const expected = {
//       id: 20,
//       name: 'Cow',
//       mainJob: 7,
//       subJob: 0,
//       mainLevel: 30,
//       subLevel: 37,
//       title: 24,
//       war: 1,
//       mnk: 1,
//       whm: 75,
//       blm: 1,
//       rdm: 1,
//       thf: 1,
//       pld: 30,
//       drk: 0,
//       bst: 0,
//       brd: 0,
//       rng: 0,
//       sam: 0,
//       nin: 0,
//       drg: 75,
//       smn: 0,
//       rankBastok: 6,
//       rankSandoria: 1,
//       rankWindurst: 1,
//       fishing: 0,
//       woodworking: 0,
//       smithing: 0,
//       goldsmithing: 0,
//       weaving: 0,
//       leathercraft: 0,
//       bonecraft: 0,
//       alchemy: 0,
//       cooking: 0,
//       face: 0,
//     };

//     const res = await request(app)
//       .get('/api/toon/Cow');

//     expect(res.body).toEqual(expected);

//   });

//   it('gets list of searched names', async () => {

//     const expected = [
//       { charname: ' Kitty' },
//       { charname: ' Badkitty' },
//       { charname: ' Badkitty' },
//       { charname: ' Little' }
//     ];

//     const res = await request(app)
//       .get('/api/toon/it');

//     expect(res.body).toEqual(expected);
//   });

// });

describe('recipe routes', () => {

  // it('gets all wood recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/wood');

  //   console.log(res.body);
  // });

  // it('gets all smith recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/smith');

  //   console.log(res.body);
  // });

  // it('gets all gold recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/gold');

  //   console.log(res.body);
  // });

  // it('gets all cloth recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/cloth');

  //   console.log(res.body);
  // });

  // it('gets all leather recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/leather');

  //   console.log(res.body);
  // });

  // it('gets all bone recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/bone');

  //   console.log(res.body);
  // });

  // it('gets all alchemy recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/alchemy');

  //   console.log(res.body);
  // });

  // it('gets all cook recipes', async () => {

  //   const res = await request(app)
  //     .get('/api/recipes/cook');

  //   console.log(res.body);
  // });

});
