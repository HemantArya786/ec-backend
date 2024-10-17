const express = require("express");
const router = express.Router();
const { findProduct } = require("../controller/user.controller");

router.get("/", findProduct);

module.exports = router;

// app.get("/product/:id", async (req, res) => {
//   try {
//     const singleProductId = req.params.id;

//     const oneProductData = await product.findById(singleProductId);

//     res.json({ message: "request recive", data: oneProductData });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/admin/createproduct", async (req, res) => {
//   try {
//     const productData = await req.body;
//     const newProduct = new product(productData);
//     newProduct.save();

//     res.json({ message: "product revice", data: productData });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete("/deleteproduct/:id", async (req, res) => {
//   try {
//     const deleteProductId = req.params.id;

//     const deleteProduct = await product.findByIdAndDelete(deleteProductId);

//     res.json({ message: "id recive", id: deleteProductId });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.put("/updateproduct/:id", async (req, res) => {
//   try {
//     const editProductId = req.params.id;
//     const editProductItem = req.body;

//     const updateData = await product.findByIdAndUpdate(
//       editProductId,
//       editProductItem,
//       {
//         new: true,
//       }
//     );

//     res.json({ message: "id recive", data: updateData });
//   } catch (error) {
//     console.log(error);
//   }
// });
