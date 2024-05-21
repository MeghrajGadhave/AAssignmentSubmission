const mongoose = require('mongoose');

// category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    discription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive']
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;