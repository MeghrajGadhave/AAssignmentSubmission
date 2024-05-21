const CategoryDB = require('../models/category');

//category list page
module.exports.showCategory = async function (req, res) {
    try {
        // find all category in DB 
        let categorise = await CategoryDB.find({});
        
        return res.render('products/showCategory', {
            title: "Category",
            categorise
        })
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Internal server error');
        return res.redirect('back');
    }
}

// create category page
module.exports.createCategoryPage = function (req, res) {
    return res.render('products/addCategory', {
        title: "Add category",
        url: '/category/create'
    })
}

//create category
module.exports.create = async function (req, res) {
    try {

        let { name, discription, status } = req.body;

        // check category already exit in db
        let category = await CategoryDB.findOne({ name: name });

        //if category not found in db then create new category
        if (!category) {
            // create new category
            category = await CategoryDB.create(req.body);
            req.flash('success', 'category create successfully');
            return res.redirect('back');
        }

        req.flash('error', 'category exist in DB');
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Internal server error');
        return res.redirect('back');
    }
}

//delete category
module.exports.delete = async function (req, res) {
    try {
        let { id } = req.query;
        // delete category
        await CategoryDB.findByIdAndDelete(id);
        req.flash('success', 'category delete successfully');
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Internal server error');
        return res.redirect('back');
    }
}

//update status of category
module.exports.updateStatus = async function (req, res) {
    try {
        let { id, status } = req.query;
        //if active then Inactive 
        if (status == "Active") {
            status = "Inactive"
        }
        else {
            //Inactive then active
            status = "Active"
        }

        //update in db
        await CategoryDB.findByIdAndUpdate(id, { status: status });
        // notification
        req.flash('success', 'status update successfully');
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        req.flash('error', 'Internal server error');
        return res.redirect('back');
    }
}