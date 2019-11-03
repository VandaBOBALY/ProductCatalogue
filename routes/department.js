const express = require("express");
const router = express.Router();

const Department = require("./../model/department"); //on recupere le modele

//CRUD :
//POST
router.post("/department/create", async (req, res) => {
  try {
    const title = req.body.title;
    const newDepartment = Department({
      //on crée un dept avec title: req.body.title
      title: title
    });
    await newDepartment.save();
    res.json(newDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/department", async (req, res) => {
  try {
    const departments = await Department.find(); //on recup tous les dept
    res.json(departments); //on le renvoie comme contenu
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.post("/department/update", async (req, res) => {
  try {
    if (req.body.id) {
      //dans l'exo c'est une requete query et non pas params, donc ça  devrait être req.query.id
      //si l'id fourni existe

      const department = await Department.findOne({ _id: req.body.id }); // dans ce cas on demande de retrouver l'item qui correspond à cet id
      department.title = req.body.title; //et on modifie le title pour que ça devienne le nouveau title fourni
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
