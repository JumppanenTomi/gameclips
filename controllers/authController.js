"use strict";
const jwt=require("jsonwebtoken");
const passport=require("passport");
const model=require('../models/userModel')
const bcryptjs=require('bcryptjs')
const { validationResult }=require('express-validator');
const salt=bcryptjs.genSaltSync(10);
require('dotenv').config();

const login=(req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(req.body)
        if (err||!user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token=jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res);
};

const register=async (req, res, next) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        res.send(errors.array());
    } else {
        const result=await model.addUser(req.body.username, req.body.email, bcryptjs.hashSync(String(req.body.password), salt));
        if (result.insertId) {
            res.json(true);
        } else {
            res.status(400).json({ error: 'register error' });
        }
    }
};

const update=async (req, res, next) => {
    const errors=validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user update error', errors);
        res.send(errors.array());
    } else {
        const result=await model.updateUser(user=req.user, req.body.email, bcryptjs.hashSync(String(req.body.password), salt));
        if (result.insertId) {
            res.json({ message: `User updated`, user_id: result.insertId });
        } else {
            res.status(400).json({ error: 'Update error' });
        }
    }
};

const logout=(req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json('logged out');
    });
};

const checkToken=(req, res) => {
    res.json({ user: req.user });
};

module.exports={
    login, checkToken, register, logout, update,
}