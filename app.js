'use strict';
const express=require('express');
const app=express();
const session=require('express-session');
const cors=require('cors');
const passport=require("./utils/passport");
require('dotenv').config();

const port=3000;

const loggedIn=(req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/form");
    }
};

const clipRoutes=require('./routes/clipRoutes');
const browseRoutes=require('./routes/browseRoutes');
const commentRoutes=require('./routes/commentRoutes');
const profileRoutes=require('./routes/profileRoutes');

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static('public'))

app.get('/', function (req, res) {
    res.redirect('https://github.com/JumppanenTomi/gameclips-backend/tree/main');
});

app.use('/clip', clipRoutes);
app.use('/browse', browseRoutes);
app.use('/comment', commentRoutes);
app.use('/profile', profileRoutes);

// modify app.post('/login',...
app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/form" }),
    (req, res) => {
        console.log("success");
        res.redirect("/secret");
    }
);

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json('logged out');
    });
});

// modify app.get('/secret',...
app.get("/secret", loggedIn, (req, res) => {
    res.render("secret");
});


app.listen(port, () => console.log(`App listening on port ${port}!`));
