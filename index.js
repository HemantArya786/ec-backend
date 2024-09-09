const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb+srv://hemant:hemant@cluster0.6w5hjzu.mongodb.net/");

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
  password: String,
});

//cart schema

const CartSchema = new mongoose.Schema({
  product: [ProductSchema],
  userId: String,
});

//Product CRUD API

app.get("/", async (req, res) => {
  try {
    const allProductData = await product.find();

    res.json({ message: "request recive", data: allProductData });
  } catch (error) {
    console.log(error);
  }
});
app.get("/product/:id", async (req, res) => {
  try {
    const singleProductId = req.params.id;

    const oneProductData = await product.findById(singleProductId);

    res.json({ message: "request recive", data: oneProductData });
  } catch (error) {
    console.log(error);
  }
});

app.post("/createproduct", async (req, res) => {
  try {
    const productData = await req.body;
    const newProduct = new product(productData);
    newProduct.save();

    res.json({ message: "product revice", data: productData });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const deleteProductId = req.params.id;

    const deleteProduct = await product.findByIdAndDelete(deleteProductId);

    res.json({ message: "id recive", id: deleteProductId });
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateproduct/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

// user CRUD API

//user list
app.get("/users", async (req, res) => {
  try {
    const allusers = await productUser.find();
    res.json({ message: "all user data", data: allusers });
  } catch (error) {
    console.log(error);
  }
});

//login user

app.post("/login", async (req, res) => {
  try {
    const { email, phone, password, firstname } = req.body.data;

    const findingUser = await productUser.findOne({ email });

    if (findingUser.password === password) {
      console.log("user login");

      res.json({ data: findingUser });
    }
  } catch (error) {
    console.log(error);
  }
});

//create new user
app.post("/new_users", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await new productUser(user);
    newUser.save();

    res.json({ message: "user save successfully" });
  } catch (error) {
    console.log(error);
  }
});

//find user by id
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const findUser = await productUser.findById(userId);
    res.json({ message: "id recive", data: findUser });
  } catch (error) {
    console.log(error);
  }
});

//delete user by id

app.delete("/delete_user/:id", async (req, res) => {
  try {
    const deleteUserId = req.params.id;
    const deleteUser = await productUser.findByIdAndDelete(deleteUserId);

    res.json({ message: "user delete successfully" });
  } catch (error) {
    console.log(error);
  }
});

//update user by id

app.put("/update_user/:id", async (req, res) => {
  try {
    const updateUserId = req.params.id;
    const updateUserData = req.body;
    const updateUser = await productUser.findByIdAndUpdate(
      updateUserId,
      updateUserData,
      { new: true }
    );

    res.json({ message: "user update successfully", data: updateUser });
  } catch (error) {
    console.log(error);
  }
});

//cart api

//create cart api
// app.post("/cart", async (req, res) => {
//   const userCart = await req.body;
//   const newCart = new cart(userCart);
//   newCart.save();

//   res.json({ message: "requsted cart ", data: userCart });
// });

//all cart api
// app.get("/cart", async (req, res) => {
//   const allCart = await cart.find();
//   res.json({ message: "all cart", data: allCart });
// });

// find cart by id
app.get("/cart/:id", async (req, res) => {
  try {
    const reciveUserId = req.params.id;
    const findUserById = await cart.find({ userId: reciveUserId });

    res.json({
      message: "recive user id",
      id: reciveUserId,
      data: findUserById,
    });
  } catch (error) {
    console.log(error);
  }
});

//Add quantity

app.put("/cart/increase/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    const foundCart = await cart.findOne({ userId });
    const foundIndex = foundCart.product.findIndex(
      (item) => item._id == productId
    );

    foundCart.product[foundIndex].quantity =
      foundCart.product[foundIndex].quantity + 1;
    const result = await foundCart.save();

    res.json({ message: "recive", data: result });
  } catch (error) {
    console.log(error);
  }
});

// decrease quantity

app.put("/cart/decrease/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    const foundCart = await cart.findOne({ userId });
    const foundIndex = foundCart.product.findIndex(
      (item) => item._id == productId
    );

    foundCart.product[foundIndex].quantity =
      foundCart.product[foundIndex].quantity - 1;

    const result = await foundCart.save();

    res.json({ message: "decrease quantity", data: result });
  } catch (err) {
    console.log(err);
  }
});

// remove item
app.delete("/cart/removeitem/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    const foundCart = await cart.findOne({ userId });

    foundCart.product = foundCart.product.filter(
      (item) => item._id != productId
    );

    foundCart.save();

    res.json({
      message: "item remove",
    });
  } catch (error) {
    console.log(error);
  }
});

//add item in cart

app.post("/cart/addItem/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    const foundCart = await cart.findOne({ userId });
    const findProduct = await product.findById(productId);

    foundCart.product.push(findProduct);

    foundCart.save();

    res.json({ message: "add value in cart ", data: findProduct });
  } catch (error) {
    console.log(error);
  }
});

// ? how to do total random idea

app.get("/cart/totalprice/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const foundCart = await cart.findOne({ userId });
    const priceArray = [];

    foundCart.product.map((item) => priceArray.push(item.price));

    const total = priceArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    res.json({ message: "calculation of total price", total: total });
  } catch (error) {
    console.log(error);
  }
});

//model
const product = mongoose.model("product", ProductSchema);
const productUser = mongoose.model("productUser", UserSchema);
const cart = mongoose.model("cart", CartSchema);

app.listen(port, () => console.log(`Server running on port ${port}`));
