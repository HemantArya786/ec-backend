const product = require("../models/product.model");

const findProduct = async (req, res) => {
  try {
    const allProductData = await product.find();

    res.json({ message: "request recive", data: allProductData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findProduct,
};
