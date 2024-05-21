const nodemailer = require('../config/nodemailer');
require('dotenv').config();

//mailer
exports.fogotPasswordLinkMail = (email, accessToken) => {
    // return ejs file for forgot email
    let htmlString = nodemailer.renderTemplete({ email: email, accessToken: accessToken }, '/forgotPassword.ejs')

    // send email
    nodemailer.transporter.sendMail({
        from: process.env.email || 'programming.tushar@gmail.com',
        to: email,
        subject: "Reset Password Link",
        html: htmlString
    }, function (err, info) {
        // error in sending mail
        if (err) {
            console.log("error inside mailer :: ", err);
            return;
        }
        // print info of mail
        console.log("mail send ", info);
        return info;
    })
}