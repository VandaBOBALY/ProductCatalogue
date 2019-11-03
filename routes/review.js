const express = require("express");
const router = express.Router();

const Review = require("./../model/review");

//POST
router.post("/review/create", async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    if (product) {
      const newReview = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
        username: req.body.username,
        product: req.body.productId
      });
      await newReview.save();
      res.json({ message: "Created" });
    } else res.json({ message: "Le produit n'existe pas" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
