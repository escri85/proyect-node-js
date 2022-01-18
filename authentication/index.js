const passport = require('passport')
const loginStrategy = require('./strategy.login')
const registerStrategy = require('./strategy.register')
const User = require('../models/User')


// Esta función usará el usuario de req.LogIn para registrar su id.
passport.serializeUser((user, done) => {
    return done(null, user._id);
});

// Esta función buscará un usuario dada su _id en la DB y populará req.user si existe
passport.deserializeUser(async (userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
        } catch (err) {
        return done(err);
        }
});

/*
 seraliazer
 deseraliazer
 passport.use -> regitro
 passport.use -> login
*/


passport.use('register',registerStrategy)
passport.use('login',loginStrategy)