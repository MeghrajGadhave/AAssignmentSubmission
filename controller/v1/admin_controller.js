const AdminDB = require('../../models/admin');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//create session 
module.exports.createSession = async function (req, res) {
    try {
        let { email, password } = req.body;

        //find admin in db
        let admin = await AdminDB.findOne({ email: email });

        //if admin not found or password not match
        if (!admin || ! await bcrypt.compare(password, admin.password)) {
            return res.status(404).json({
                message: "email or password not found"
            });
        }

        //done
        return res.status(200).json({
            message: "Signin successfully",
            //genrate token
            token: jsonwebtoken.sign(admin.toJSON(), "anySecretkey@123$3", { expiresIn: 1000 * 60 * 10 })
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}