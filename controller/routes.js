const express = require("express");
const Product = require("./models/Product");
const { connections } = require("mongoose");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).send(products);
  } catch (error) {
    res.json({
      Message: "Error fetching products... try again or come back later",
    });
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/products/:productId", async (req, res) => {
  const productID = req.params.productId;
  const product = await Product.findById(productID);
  res.status(200).send(product);
});

router.put("/products/:productId", async (req, res) => {
  try {
    const productID = req.params.productId;
    const product = await Product.findByIdAndUpdate(productID, req.body);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/products/:productId", async (req, res) => {
  try {
    const productID = req.params.productId;
    const deleteProduct = await Product.findByIdAndDelete(productID);
    res.status(200).send("Product deleted successfully");
  } catch (err) {
    res
      .status(400)
      .send({ Message: "Deletion Unsuccessful", err: err.message });
  }
});
module.exports = router;
