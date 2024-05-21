const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
// path to store img of product
const IMAGE_PATH = path.join('/upload/product');
// product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    }
}, {
    timestamps: true
});


//storeage engine 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

//create static functions
// store img at given postion
productSchema.statics.uploadProductImg = multer({ storage: storage }).single('img');
// img path
productSchema.statics.IMAGE_PATH = IMAGE_PATH;

const Product = mongoose.model('Product', productSchema);

module.exports = Product;