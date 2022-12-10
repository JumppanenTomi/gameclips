"use strict";
const passport=require("passport");
const Strategy=require("passport-local").Strategy;
const passportJWT=require("passport-jwt");
const JWTStrategy=passportJWT.Strategy;
const ExtractJWT=passportJWT.ExtractJwt;
const bcryptjs=require('bcryptjs');
const { getUserLogin }=require("../models/userModel");
require('dotenv').config();

// local strategy for username password login
passport.use(
    new Strategy(async (username, password, done) => {
        const params=[username];
        try {
            const [user]=await getUserLogin(params);
            console.log("Local strategy", user); // result is binary row
            if (user===undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (!bcryptjs.compareSync(password, user.password)) { // passwords dont match
                return done(null, false);
            }
            return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    async (jwtPayload, done) => {
        try {
            console.log('util pass JWT', jwtPayload);
            if (jwtPayload===undefined) {
                return done(null, false, { message: 'Incorrect Id.' })
            }
            return done(null, { ...jwtPayload }, { message: 'Some job to do here after coffee break' });
        } catch (err) {
            return done(err);
        }
    }
));


module.exports=passport;