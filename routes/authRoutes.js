"use strict";
const express=require('express');
const router=express.Router();
const { body }=require('express-validator');
const controller=require('../controllers/authController');
const passport=require("../utils/passport");

router.post('/login', controller.login);//rotue for login

router.post('/logout', passport.authenticate('jwt', { session: false }), controller.logout);//route for logout

router.post('/register',//route for registering
    body('username').isLength({ min: 3 }).trim().escape(),//min 3 characters
    body('email').isEmail().normalizeEmail(),//must be email
    body('password').isLength({ min: 8 }).trim(),//min 8 characters
    controller.register
);

router.patch('/update', passport.authenticate('jwt'),//route to edit either email or password
    body('email').isEmail().normalizeEmail().optional({ nullable: true }),//must be email
    body('password').isLength({ min: 8 }).trim().optional({ nullable: true }),//min 8 characters
    controller.update
);

router.get("/token", passport.authenticate('jwt', { session: false }), controller.checkToken);//by calling this route with bearer token it returns you all data that bearer contains

module.exports=router;