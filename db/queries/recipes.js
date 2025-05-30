const db = require('../client');

async function getAllRecipes() {
  const result = await db.query('SELECT * FROM recipes ORDER BY id');
  return result.rows;
}

async function getRecipeById(id) {
  const result = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
}

async function createRecipe({ title, instructions, category }) {
  const result = await db.query(
    'INSERT INTO recipes (title, instructions, category) VALUES ($1, $2, $3) RETURNING *',
    [title, instructions, category]
  );
  return result.rows[0];
}

async function updateRecipe(id, fields) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

  const result = await db.query(
    `UPDATE recipes SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
}

async function deleteRecipe(id) {
  const result = await db.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
