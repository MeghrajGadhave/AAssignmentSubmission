const mongoose = require('mongoose');

//forgot password schema
const forgotPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

module.exports = ForgotPassword;