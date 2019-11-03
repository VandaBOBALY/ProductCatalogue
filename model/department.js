//création des models
const Department = mongoose.model("Department", {
  title: String
});

module.exports = Department;
