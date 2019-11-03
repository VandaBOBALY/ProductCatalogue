const express = require("express");
const router = express.Router();

//CRUD :
//POST
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.body.title
    });
    await newDepartment.save();
    res.json({ message: "Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/department", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.post("/department/update", async (req, res) => {
  try {
    if (req.body.id) {
      const department = await Department.findOne({ _id: req.body.id });
      await department.save();
      res.json({ message: "Updated" });
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.post("/department/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const department = await Department.findOne({ _id: req.body.id });
      await department.remove();
      res.json({ message: "Removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
