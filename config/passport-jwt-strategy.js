const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const AdminDB = require('../models/admin');

// options
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "anySecretkey@123$3"
}

passport.use(new jwtStrategy(opts, async function (payload, done) {
    try {
       
        let admin = await AdminDB.findById(payload._id);
        if (!admin) {
            return done(null, admin);
        }
        return done(null, admin);
    }
    catch (err) {
        return done(err);
    }
}));

module.exports = passport;