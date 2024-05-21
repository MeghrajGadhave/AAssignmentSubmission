const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const AdminDB = require('../models/admin');
const bcrypt = require('bcrypt');

passport.use(new localStategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function (req, email, password, done) {
    try {
      
        let admin = await AdminDB.findOne({ email: email });

        if (!admin || !await bcrypt.compare(password, admin.password)) {
            req.flash('error', "invaild email or password");

            return done(null, false);
        }

        return done(null, admin);
    }
    catch (err) {
        console.log(err);
        return done(err);
    }
}));

//serialize user
passport.serializeUser((user, done) => {
    return done(null, user.id);
})

//deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        //find admin in db
        let admin = await AdminDB.findById(id);
        if (!admin) {
            return done(null, false);
        }

        return done(null, admin);
    }
    catch (err) {
        return done(err);
    }
})

passport.checkAuthenticationUser = function (req, res, next) {
    if (req.user) {
        return next();
    }
    return res.redirect('/signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }
    next();
}
