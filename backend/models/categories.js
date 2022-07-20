const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Categories = mongoose.model("Categories", categoriesSchema);
exports.Categories = Categories;