const express = require("express");
const router = express.Router();

//CRUD :
//POST
router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      description: req.body.description,
      department: req.body.department
    });
    await newCategory.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.post("/category/update", async (req, res) => {
  try {
    if (req.body.id) {
      const category = await Category.findOne({ _id: req.body.id });
      await category.save();
      res.json({ message: "Updated" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.post("/category/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const category = await Category.findOne({ _id: req.body.id });
      await category.remove();
      res.json({ message: "Removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
