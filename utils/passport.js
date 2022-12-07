"use strict";
const passport=require('passport');
const Strategy=require('passport-local').Strategy;
const passportJWT=require("passport-jwt");
const JWTStrategy=passportJWT.Strategy;
const ExtractJWT=passportJWT.ExtractJwt;
require('dotenv').config();

// fake database: ****************
const users=[
    {
        user_id: 1,
        name: "Foo Bar",
        email: "foo@bar.fi",
        password: "foobar",
    },
    {
        user_id: 2,
        name: "Bar Foo",
        email: "bar@foo.fi",
        password: "barfoo",
    },
];
// *******************

// fake database functions *********
const getUser=(id) => {
    const user=users.filter((usr) => {
        if (usr.user_id===id) {
            return usr;
        }
    });
    return user[0];
};

const getUserLogin=(email) => {
    const user=users.filter((usr) => {
        if (usr.email===email) {
            return usr;
        }
    });
    return user[0];
};

// serialize: store user id in session
passport.serializeUser((id, done) => {
    process.nextTick(function () {
        return done(null, {
            id: id,
            name: getUserid(id).name,
            email: getUserid(id).email
        });
    });
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
    console.log("deserialize", user);
    process.nextTick(function () {
        return done(null, getUser(id));
    });
});

passport.use('local', new JWTStrategy({
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