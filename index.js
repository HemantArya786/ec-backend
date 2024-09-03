const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb+srv://hemant:hemant@cluster0.6w5hjzu.mongodb.net/");

/* 

ProductSchema -> { name: "toy", price: 20 }

UserSchema -> { username: "rohit", email: "rohit@r1.com", cart: [CartSchema] }

CartSchema -> { products: [ProductSchema], total: 1000, tax: 50 }

{
  username: "rohit",
  email: "r1@r1.com",
  cart: {
    products: [{ name: "toy", price: "50" }],
    tax: 50,
    total: 1000
  }
}

*/

//Product Schema
const ProductSchema = new mongoose.Schema({
  productName: String,
  catagory: String,
  price: Number,
  image: String,
  description: String,
  quantity: Number,
});

//user Schema
const UserSchema = new mongoose.Schema({
  fistname: String,
  lastname: String,
  email: String,
  phoneNumber: String,
});

//cart schema

const CartSchema = new mongoose.Schema({
  product: [ProductSchema],
  userId: String,
});

//Product CRUD API

app.get("/", async (req, res) => {
  const allProductData = await product.find();

  res.json({ message: "request recive", data: allProductData });
});
app.get("/product/:id", async (req, res) => {
  const singleProductId = req.params.id;

  const oneProductData = await product.findById(singleProductId);

  res.json({ message: "request recive", data: oneProductData });
});

app.post("/createproduct", async (req, res) => {
  const productData = await req.body;
  const newProduct = new product(productData);
  newProduct.save();

  res.json({ message: "product revice", data: productData });
});

app.delete("/deleteproduct/:id", async (req, res) => {
  const deleteProductId = req.params.id;

  const deleteProduct = await product.findByIdAndDelete(deleteProductId);

  res.json({ message: "id recive", id: deleteProductId });
});

app.put("/updateproduct/:id", async (req, res) => {
  const editProductId = req.params.id;
  const editProductItem = req.body;

  const updateData = await product.findByIdAndUpdate(
    editProductId,
    editProductItem,
    {
      new: true,
    }
  );

  res.json({ message: "id recive", data: updateData });
});

// user CRUD API
app.get("/users", async (req, res) => {
  const allusers = await productUser.find();
  res.json({ message: "all user data", data: allusers });
});

app.post("/new_users", async (req, res) => {
  const user = req.body;
  const newUser = await new productUser(user);
  newUser.save();

  res.json({ message: "user save successfully" });
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const findUser = await productUser.findById(userId);
  res.json({ message: "id recive", data: findUser });
});

app.delete("/delete_user/:id", async (req, res) => {
  const deleteUserId = req.params.id;
  const deleteUser = await productUser.findByIdAndDelete(deleteUserId);

  res.json({ message: "user delete successfully" });
});

app.put("/update_user/:id", async (req, res) => {
  const updateUserId = req.params.id;
  const updateUserData = req.body;
  const updateUser = await productUser.findByIdAndUpdate(
    updateUserId,
    updateUserData,
    { new: true }
  );

  res.json({ message: "user update successfully", data: updateUser });
});

//cart api

//create car api
app.post("/cart", async (req, res) => {
  const userCart = await req.body;
  const newCart = new cart(userCart);
  newCart.save();

  res.json({ message: "requsted cart ", data: userCart });
});

//all cart api
app.get("/cart", async (req, res) => {
  const allCart = await cart.find();
  res.json({ message: "all cart", data: allCart });

  res.json({ message: "requsted cart ", data: allCart });
});

// find cart by id
app.get("/cart/:id", async (req, res) => {
  const reciveUserId = req.params.id;
  const findUserById = await cart.find({ userId: reciveUserId });

  res.json({ message: "recive user id", id: reciveUserId, data: findUserById });
});

//Add quantity

app.put("/cart/:id", async (req, res) => {
  const reciveUserId = req.params.id;
  const productId = req.body.productId;
  const productPrice = req.body.price;

  const findProductInUserCart = await cart.findOne({ userId: reciveUserId });
  console.log(findProductInUserCart, " kya mila");

  res.json({ id: reciveUserId, product: productId, price: productPrice });
});

//model
const product = mongoose.model("product", ProductSchema);
const productUser = mongoose.model("productUser", UserSchema);
const cart = mongoose.model("cart", CartSchema);

app.listen(port, () => console.log(`Server running on port ${port}`));
