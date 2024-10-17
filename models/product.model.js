const mongoose = require("mongoose");

//Product Schema
const ProductSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  quantity: Number,
  postiveRating: Number,
  negativeRating: Number,
});

//model
const product = mongoose.model("product", ProductSchema);

module.exports = product;
