const mongoose = require('mongoose');

// admin schema
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;