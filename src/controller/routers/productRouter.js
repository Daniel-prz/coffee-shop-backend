const express = require("express");
const Product = require("../models/Product");
const upload = require("../../middleware/upload");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy,
      sortOrder = "asc",
    } = req.query;
    const filter = category ? { category } : {};
    const sort = sortBy ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
    const products = await Product.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    const total = await Product.countDocuments(filter);
    res.json({ total, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/products", upload, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file.path;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
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
