const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    image: String,
    title: String,
    qty: String,
    
    protein: String,
    fat: String,
    carbs: String,
    ingredientLines: String
    
  })
);

module.exports = Recipe;
