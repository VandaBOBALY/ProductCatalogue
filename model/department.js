//création des models

const mongoose = require("mongoose");

const Department = mongoose.model("Department", {
  title: String
});

module.exports = Department; //export du modèle
