//cart schema

const mongoose = require("mongoose");

// const CartSchema = new mongoose.Schema({
//   product: [ProductSchema],
//   userId: String,
// });

//user Schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phoneNumber: String,
  password: String,
  userCart: [ProductSchema],
});

const productUser = mongoose.model("productUser", UserSchema);

module.exports = productUser;
