import { normalize, schema } from 'normalizr';
// const { normalize, schema } = require('normalizr');

// const user = new schema.Entity('users');

// export const recipe = new schema.Entity('recipes', {
//   instructions: [instruction],
//   ingredients: [ingredient]
// });

// export const instruction = new schema.Entity('instructions', {
//   recipeId: recipe
// });

// export const ingredient = new schema.Entity('ingredients', {
//   recipeId: recipe
// });
export const tileSchema = new schema.Entity('tiles');

export const boardSchema = [tileSchema];

export const instructionSchema = new schema.Entity('instructions', {

}, { idAttribute: '_id' });
// export const ingredientSchema = new schema.Entity('ingredients', {}, {
//   idAttribute: '_id'
// });

export const recipeSchema = new schema.Entity('recipes', {
  // recipes: [recipe],
  instructions: [instructionSchema],
  // ingredients: [ingredientSchema]
}, { idAttribute: '_id' });

export const recipeListSchema = [recipeSchema]

const data = [{ _id: '123', name: 'Jim' }, { _id: '456', name: 'Jane' }];
const userSchema = new schema.Entity('users');
const userListSchema = [userSchema];

const normalizedData = normalize(data, userListSchema);
