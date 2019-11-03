const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost/catalogue-app", {
  useNewUrlParser: true
});

const categoryRoutes = require("./routes/category");
app.use(categoryRoutes);

const productRoutes = require("./routes/product");
app.use(productRoutes);

const departmentRoutes = require("./routes/department");
app.use(departmentRoutes);

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server started");
});
