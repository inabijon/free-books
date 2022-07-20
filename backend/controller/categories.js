const { Categories } = require('../models/categories') 

exports.getCategories =  async (req, res) => {
    const categories = await Categories.find();
    res.send(categories);
};

exports.createCategory = async (req, res) => {
    let allCategories = new Categories({
        name: req.body.name,
    });
    allCategories = await allCategories.save();

    res.status(201).send(allCategories);
};

