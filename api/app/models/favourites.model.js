const mongoose = require("mongoose");

const Favourite = mongoose.model(
  "Favourite",
  new mongoose.Schema({
    image: String,
    title: String,
    qty: String,
    
    protein: String,
    fat: String,
    carbs: String,
    ingredientLines: String,
    username: String
    
  })
);

module.exports = Favourite;
