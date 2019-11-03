const express = require("express");
const router = express.Router();

const Product = require("./../model/product");

//CRUD :
//POST
router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });
    await newProduct.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.post("/product/update", async (req, res) => {
  try {
    if (req.body.id) {
      const product = await Product.findOne({ _id: req.body.id });
      await product.save();
      res.json({ message: "Updated" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.post("/product/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const product = await Product.findOne({ _id: req.body.id });
      await product.remove();
      res.json({ message: "Removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
