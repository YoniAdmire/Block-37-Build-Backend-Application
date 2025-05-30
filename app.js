const express = require('express');
const app = express();
const recipesRouter = require('./api/recipes');
const ingredientsRouter = require('./api/ingredients');

app.use(express.json());
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
